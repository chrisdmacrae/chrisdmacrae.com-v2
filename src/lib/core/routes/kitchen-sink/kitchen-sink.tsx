import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePlugin } from "tinacms";
import { ReferenceCallout } from "../../components/Reference/Callout";
import { ReferenceCard } from "../../components/Reference/Card";
import { Heading } from "../../components/Typography/Heading";
import BaseLayout from "../../layouts/Base";
import { useKitchenSinkForm } from "./kitchen-sink.form";

export function KitchenSinkRoute({ page }) {
  const [data, form] = useKitchenSinkForm(page.file);
  const seo = {
    title: data.title,
    description: data.description
  }

  usePlugin(form)

  return (
    <BaseLayout seo={seo}>
      <ReferenceCallout
        title={data.title}
        body={data.body}
        image={data.image}
        variant="dark"
        reference={{
          url: "/",
          text: "Go home!",
          created_date: ""
        }}
      />
      <Container>
        <p>{data.description}</p>
        <Row className="pt-4 pb-4">
          <Col md="6">
            <ReferenceCard
              size="lg"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
          </Col>
          <Col md="6">
            <ReferenceCard
              size="sm"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
            <ReferenceCard
              size="sm"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
            <ReferenceCard
              size="sm"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
          </Col>
        </Row>
        <Row className="pt-4 pb-4">
          <Col md="8">
            <Heading as="h5" border={true} bold={true}>
              All Stories
          </Heading>
            <ReferenceCard
              size="md"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
            <ReferenceCard
              size="md"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
            <ReferenceCard
              size="md"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae"
                },
                created_date: "",
                body:[]
              }}
            />
          </Col>
          <Col md="4">
            <Heading as="h5" border={true}>
              My projects
          </Heading>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}

export default KitchenSinkRoute;