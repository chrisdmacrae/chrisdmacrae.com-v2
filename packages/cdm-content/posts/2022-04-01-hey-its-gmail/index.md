---
title: HEY! It's Gmail
description: Re-creating the core value propositions of HEY.com, but in Gmail
createdBy: chris
updatedBy: chris
created: 2022-04-01
---
## We didn’t reinvent the wheel, only email.

That's what Basecamp, the creators of [HEY.com], say they've done for email. Quite a divisive statement, and for some, it's true.

I for one am one of those people. The mental model HEY provides for managing my email is refreshing, simple, and most of all, _relaxing_. It takes the "hair on fire" out of the email inbox, and makes "inbox zero" unecessary.

But here's the catch -- what if you've got email you just can't put through HEY? I for one have work email that lives in Google workspaces and routing it through HEY would be a huge violation of our security regulations. So I just gave Gmail the power to say, HEY.

## It all starts with a Yes or No

![](/uploads/2022-04-01-hey-its-gmail/screener.png)

When someone emails your @hey.com address for the very first time, they don’t get straight through, they land in The Screener. This is where you decide if you want to hear from them or not. **Yes** and they’re in, **No** and you’ll never hear from them again. It’s consent-based email, where you’re in control.

So how do I make this happen in Gmail? Using the _multiple inboxes_ feature, which allows you to display custom sections in your inbox that correspong to _labels_ attached to your emails. Sound complicated? Don't worry, I'll break it down.

|                  |                  |
| ---------------- | ---------------- |
| ![](/uploads/2022-04-01-hey-its-gmail/imbox.png) | ![](/uploads/2022-04-01-hey-its-gmail/inbox.png) |

With this multiple inbox setup, we've retrofitted gmail to:

1. Display _unread_ screened emails in a collapsible section, similar to the Imbox. The emails you've said **Yes** to but have yet to read or sort.
2. Display _read_ screened emails in a collapsible section, similar to the Imbox. This is so you can keep them hidden unless you need to go back to them.
3. Display _unscreened_ emails in your inbox. These are all of the emails you haven't said **Yes** or **No** to.

To set this up, open the settings menu (the cog in the top right corner) and then select "Customize" under "Multiple inboxes":

![](/uploads/2022-04-01-hey-its-gmail/settings.png)

Configure your settings to match the following:

![](inbox-settings.png)

1. Inbox type as "Multiple inboxes"
2. Section 1 as `label:Screened Senders is:unread`, with the section name `New for you`
3. Section 2 as `label:Screened Senders is:read`, with the section name `Previously seen`
4. Set your maximum page size as desired. The default is 9, which I found way too low.
5. Multiple inbox position as "Above the inbox". That way your unread, screened messages are top of mind.

### The Imbox

With Gmail, the yes and the no aren't as clean and tidy as HEY. But it still works!

#### The Yes

To say **Yes**, we'll use the "filter messages like these" feature of gmail, which auto-generates filter criteria for incoming email.

Select an email, and then open up the additional options and select "Filter messages like these":

![](/uploads/2022-04-01-hey-its-gmail/yes-1.png)

Then, select "Create filter" in the modal that opens:

![](/uploads/2022-04-01-hey-its-gmail/yes-2.png)

For our final step, we will select the options:

![](/uploads/2022-04-01-hey-its-gmail/yes-3.png)

- "Skip the inbox", because we're screening these automatically out of the unsorted inbox
- Create or apply the label `Screeened Senders` to screen in incoming messages like these 
- (Optional) Apply the filter to all existing matching conversations so they all retroactively are screened in. If you don't enable this, only new mail will be screened in.

Then select "Create filter" and watch the magic happen!

#### The No

To say **No**, we'll go through a similar process:

Select an email, and then open up the additional options and select "Filter messages like these":

![](/uploads/2022-04-01-hey-its-gmail/yes-1.png)

Then, select "Create filter" in the modal that opens:

![](/uploads/2022-04-01-hey-its-gmail/yes-2.png)

For our final step, we will select the options:

![](/uploads/2022-04-01-hey-its-gmail/no.png)

- "Skip the inbox", because we're screening these automatically out of the unsorted inbox. These emails are "screened out" because they go to the archive and don't receive the "Screen Senders" label.

Then select "Create filter" and watch the magic happen!

### The Feed

![The Feed is for your casual, whenever reads. The Feed turns your newsletters, promotional emails, and long-reads into a browsable, casual newsfeed. Just scroll, everything’s open already. See something you like? Click it and read the whole thing right in place.](the-feed.png)

To set up The Feed, we'll screen in senders, but apply a "The Paper Trail" label instead of a "Screened Senders" label:

![](/uploads/2022-04-01-hey-its-gmail/yes-1.png)

Then, select "Create filter" in the modal that opens:

![](/uploads/2022-04-01-hey-its-gmail/yes-2.png)

For our final step, we will select the options:

![](/uploads/2022-04-01-hey-its-gmail/yes-3.png)

- "Skip the inbox", because we're screening these automatically out of the unsorted inbox
- Create or apply the label `The Feed` to screen in incoming messages like these 
- (Optional) Apply the filter to all existing matching conversations so they all retroactively are screened in. If you don't enable this, only new mail will be screened in.

Then select "Create filter" and watch the magic happen!

### Re-screening to The Feed

Re-screening (i.e, if you've previously screened a sender) to requires you to [change your filters](#changing-managing-or-removing-filters).

### The Paper Trail

![The Paper Trail is where your transactions go. HEY’s Paper Trail keeps the transactional email clutter in one place, out of your face. When you need to refer to a receipt, order confirmation, service notification, etc. just head over to The Paper Trail and it’ll be waiting for you.](the-paper-trail.png)

To set up The Paper Trail, we'll screen in senders, but apply a "The Paper Trail" label instead of a "Screened Senders" label:

![](/uploads/2022-04-01-hey-its-gmail/yes-1.png)

Then, select "Create filter" in the modal that opens:

![](/uploads/2022-04-01-hey-its-gmail/yes-2.png)

For our final step, we will select the options:

![](/uploads/2022-04-01-hey-its-gmail/yes-3.png)

- "Skip the inbox", because we're screening these automatically out of the unsorted inbox
- Create or apply the label `The Paper Trail` to screen in incoming messages like these 
- (Optional) Apply the filter to all existing matching conversations so they all retroactively are screened in. If you don't enable this, only new mail will be screened in.

Then select "Create filter" and watch the magic happen!

### Re-screening to The Paper Trail

Re-screening (i.e, if you've previously screened a sender) to requires you to [change your filters](#changing-managing-or-removing-filters).

### Changing, Managing, or Removing Filters

If you ever decide your screening logic is not what you'd like, you can review all of the filters you've created by opening up the settings menu (the cog in the top right corner) and selecting "See all settings".

On the subsequent page, navigate to "Filters and blocked addresses". All of your filters will be listed, and you can edit, delete, or export your filters.

Keep in mind that filters _stack_ in _no paticular order_. If you want to unscreen a previously screened sender, it's best to edit that filter to _not_ add the "Screened Senders" label, which will ensure all future mail is screened out.

## Coming soon...

HEY has many other useful features, and Gmail _can_ achieve most of them. A follow up post will detail more ways to get the same value when using HEY just isn't an option, such as:

- Reply later and set aside
- Clips: storing parts of emails for quick-access later
- Using multiple email accounts in one inbox
- Sticky notes and private notes to self
- Find files / file management
- Renaming email subjects
- Merging threads
- Ignoring threads
- Autorespond when you're away