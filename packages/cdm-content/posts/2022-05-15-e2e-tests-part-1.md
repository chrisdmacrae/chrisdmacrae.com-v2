---
draft: true
title: Writing E2E Tests with Feature Scenarios
description: An introduction to evergreen E2E testing with Gherkin
createdBy: chris
updatedBy: chris
created: 2021-07-31
---

There are some things that keep software developers up at night. Things like wondering if the form library upgrade on the schedule is going to break our critical user flows, or if a change in service providers is going to effect payments from customers.

In these scenarios, unit tests aren’t going to tell us if our app is working correctly unless we have 100% test coverage, and let’s be honest, that kind of coverage is entirely unreasonable. So what can we do? For these circumstances, we can look to end-to-end tests.

## What Are E2E (End-to-End) Tests?

We hear about tests, but we aren’t always sure what’s what? Before we get into the meat and potatoes of E2E tests, let’s establish what kind of tests are available to us to better understand when E2E tests make sense.

![Screen Shot 2022-05-15 at 7.33.39 AM.png](./Screen_Shot_2022-05-15_at_7.33.39_AM.png)

We have static tests, which catch our typos and type errors as we write the code. These days, they’re handled by our IDE (integrated development environments) and linters.

We have unit tests, which operate on a single method, function, or class and ensure its behaviours work as expected, asserting the outputs are correct given expected inputs.

We have integration tests, which ensure that individual functions, classes, and modules that are intended to work together behave in unison as expected, asserting given behaviours work as expected given expected inputs.

And finally we have E2E tests, which ensure that the fully integrated, running applications behaves as expected for end users. The secret is in the name, they’re end-user tests. They test the app runs from end user interaction to end user interaction as expected.

## When do we write E2E tests?

There’s lots of debate on when to write tests and why. For E2E tests, I have a simple rule: write E2E tests for that which *sucks and is costly to manually test.* Remember, developer time is not cheap, so you should only test that which is costly to test. Some examples:

- Billing for your application. If billing breaks, you stop making money, and testing billing every day would be a time consuming endeavour.
- Signup, login and logout for your application: if new visitors to your application cannot get access to it, it’s a useless application.
- Critical form workflows: the workflows in your app that let you users *do* things with their data are usually critical to the application’s success. Ensuring the primary flows work, “smoking out” any obvious flaws introduced as you make changes to the application can help you work faster.

Basically, E2E tests help your application send out smoke signals for when things go wrong. That’s why I like to also refer to them as “smoke tests”.

## A Business Case

So we’ve been hired on as the developers for Frosty Treat in Kensington, PEI. They’ve built an online store to allow customers to order online, and the CEO wants to ensure we’re always confident that the checkout and order process is up and running, and if it’s not, that we’ll know as soon as possible so we can get it fixed.

To make this process easy, we ask the CEO to help us write some *Gherkin,* a simple human readable format for documenting business flows. Using *Given, When, Then* statements, we can build up a set of steps called a scenario outline for our tests to follow that the CEO can always review and tell us if they’re right or wrong:

```bash
Feature: Place an order and check out

  Scenario Outline: A user orders a banana split

		Given I am on the frosty treat website
	  And I'm looking at the menu
	  When I select a banana split to add to cart
	  And choose to have it delivered
	  And provide my billing information
	  Then I am prompted to confirm payment
	  And shown a receipt of my payment
	  And shown a progress estimator for when it will be delivered
```

This basic scenario lays out a clear path for our E2E tests to follow through the application. However, it doesn’t provide a lot of context. What do I click? What pages do I go to? What kind of billing information?

This is on purpose. Gherkin features and their scenarios should document *what,* not *how.* They *can* include examples of data that your tests should provide however, so let’s add billing information and handle pickup versus delivery:

```bash
Feature: Place an order and check out

  Scenario Outline: A user orders a banana split

		Given I am on the frosty treat website
	  And I'm looking at the menu
	  When I select a <menu_item> to add to cart
	  And choose to have it <order_fulfillment>
	  And provide my billing information:
	    | card name   | <billing_card_name>      |
	    | card number | <billing_card_number>    |
	    | card expiry | <billing_card_expiry     |
	    | address 1   | <billing_address_line1>  |
	    | address 2   | <billing_address_line2>  |
	    | city        | <billing_address_city>   |
	    | postal code | <billing_address_postal> |
	  Then I am prompted to confirm payment
	  And shown a receipt of my payment
	  And shown a progress estimator for when it will be <order_fulfillment> 
	
	  Examples:
	    # General example information
			| menu_item    | order_fulfillment |
	    | banana split | delivered         |
			| banana split | picked up         |
	
	    # Example billing information
	    | billing_card_name | billing_card_number | billing_card_expiry | billing_address_line1 | billing_address_line2 | billing_address_city | billing_address_postal |
	    | John Doe          | 4242424242424242    | 04/42/2042          | 123 Sesame St.        | N/A                   | Kensington           | C1A 1A1                |
```

Now we have an extremely clear example to write E2E tests for:

- We’ll have a test for a banana split order
- We’ll test when it is scheduled for delivery and when it is scheduled for pick up
- We have billing information provided by the CEO that we know will work

Now what about problem scenarios, when things *go wrong?* We can absolutely test for that, let’s add a new scenario outline for this, and then ask the CEO to fill in the blanks:

```bash
Feature: Place an order and check out

  Scenario Outline: A user orders a banana split

		...

	Scenario: an order has invalid payment information
```

After about 10 minutes the CEO fills in the outline for the first scenario as follows:

```bash
Feature: Place an order and check out

  Scenario Outline: A user orders a banana split

		...

	Scenario: an order has invalid payment information

		Given I am on the frosty treat website
	  And I'm looking at the menu
	  When I select a <menu_item> to add to cart
	  And choose to have it <order_fulfillment>
	  And provide incorrect billing information:
	    | card name   | <billing_card_name>      |
	    | card number | <billing_card_number>    |
	    | card expiry | <billing_card_expiry     |
	    | address 1   | <billing_address_line1>  |
	    | address 2   | <billing_address_line2>  |
	    | city        | <billing_address_city>   |
	    | postal code | <billing_address_postal> |
		Then I am prompted to review the incorrect information

		Examples:
	    # General example information
			| menu_item    | order_fulfillment |
	    | banana split | delivered         |
			| banana split | picked up         |
	
	    # Example billing information
	    | billing_card_name | billing_card_number | billing_card_expiry | billing_address_line1 | billing_address_line2 | billing_address_city | billing_address_postal |
	    | John Doe          | 4000000000000000    | 04/42/1993          | 123 Sesame St.        | N/A                   | Kensington           | C1A 1A1x               |
```

We’ve got a new scenario that isn’t much different, but will cause error feedback in the app that we can verify is working correctly.

## Using Gherkin in E2E Tests

The most powerful part of Gherkin is that while being human-readable, it’s also *machine-readable.* Using a library, we can make popular testing libraries like Cypress, Selenium, and Puppeteer understand Gherkin so we can map our test logic directly to the feature file. This looks something like:

```bash
Given("I am on the frosty treat website", () => {
  // Navigate to frosty treat website
})

Given("I'm looking at the menu", () => {
  // Navigate to the frosty treat menu
})

When("I select a <menu_item> to add to cart", (menu_item) => {
  // select the menu item from the menu
})

When("choose to have it <order_fulfillment>", (order_fulfillment_type) => {
  // navigate to checkout and select order fulfilment type
})

Then("I am prompted to confirm payment", () => {
 // Confirm payment
})
```

In my next article, I’ll walk through how to use Gherkin with Cypress, the E2E testing framework, to convert the CEOs feature scenarios into working tests.