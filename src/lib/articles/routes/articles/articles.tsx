import React from 'react';
import { usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from '../../../core/layouts/Main';
import { useArticlesForm } from './articles.form';
import styles from "./articles.module.css";
import { ReferenceCallout } from '../../../core/components/Reference/Callout';
import { ReferenceCard } from '../../../core/components/Reference/Card';
import { Heading } from '../../../core/components/Typography/Heading';

export interface ArticlesProps {
  file: any;
  isEditing?: boolean;
  children?: React.ReactChild;
}

export function ArticlesRoute({ file }: ArticlesProps) {
  const [data, form] = useArticlesForm(file);
  const repo_path = [
    "https://github.com",
    process.env.REPO_FULL_NAME,
    "blob",
    process.env.BASE_BRANCH,
    "src",
    (file as GitFile).fileRelativePath
  ].join("/");
  const page = {
    title: data.title,
    description: data.description
  }

  usePlugin(form);

  return (
    <InlineForm form={form}>
      <MainLayout page={page}>
        <Container>
          <Row>
            <Col>
            <ReferenceCallout
              title={data.title}
              body={data.description}
              variant="dark"
              reference={{
                url: "/",
                text: "Go home!"
              }}
              className="bg-lightblue"
            />
            </Col>
          </Row>
          <Row className="pt-4 pb-4">
            <Col xs={12}>
              <Heading as="h5" border={true} bold={true}>
                Featured Stories
              </Heading>
            </Col>
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
              {[0, 1, 2].map((n, index) => (
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
                  key={index}
                />
              ))}
            </Col>
          </Row>
          <Row className="pt-4 pb-4">
            <Col>
              <Heading as="h5" border={true} bold={true}>
                All Stories
              </Heading>
              {[0, 1, 2].map((n, index) => (
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
                  key={index}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </InlineForm>
  );
}

export default ArticlesRoute;