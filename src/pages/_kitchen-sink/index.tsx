import React from 'react';
import { useForm, usePlugin } from 'tinacms';
import MainLayout from '../../lib/core/layouts/Main';
import { ReferenceCallout } from '../../lib/reference/components/Callout';
import { Col, Container, Row } from 'react-bootstrap';
import { ReferenceCard } from '../../lib/reference/components/Card';
import { Heading } from '../../lib/core/components/Typography/Heading';

export default function HomePage({file, preview}) {
  const formOptions = {
    id: "home",
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'description', component: 'text' },
      { name: 'body', component: 'textarea' }
    ],
    initialValues: {
      title: "Mundana is an HTML Bootstrap Template for Professional Blogging",
      description: "Hello world, this site is alive!",
      body: "Beautifully crafted with the latest technologies, SASS & Bootstrap 4.1.3, Mundana is the perfect design for your professional blog. Homepage, post article and category layouts available."
    },
    onChange: (data) => console.log(data),
    onSubmit: (data) => console.log(data)
  }
  const [data, form] = useForm(formOptions);
  const page = {
    title: data.title,
    description: data.description
  }
  
  usePlugin(form)

  return (
    <MainLayout page={page}>
      <ReferenceCallout
        title={data.title}
        body={data.body}
        reference={{
          url: "/",
          text: "Go home!"
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
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
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
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
              }}
            />
            <ReferenceCard
              size="sm"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
              }}
            />
            <ReferenceCard
              size="sm"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
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
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
              }}
            />
            <ReferenceCard
              size="md"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
              }}
            />
            <ReferenceCard
              size="md"
              reference={{
                title: "Hello world",
                description: "I am alive",
                href: "#",
                author: {
                  name: "Chris D. Macrae",
                  readingTime: 1000 * 60 * 60 * 5
                }
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
    </MainLayout>
  );
}

export const getStaticProps = (context) => {
  return {
    props: {
      preview: true,
      file: {
        fileRelativePath: "./src/content/home.json"
      }
    }
  }
}
