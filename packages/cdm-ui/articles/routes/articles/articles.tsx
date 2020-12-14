import React, { Fragment, useContext, useMemo } from 'react';
import { useForm, usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from '../../../core/layouts/Main';
import { useArticlesForm } from './articles.form';
import { ReferenceCallout } from '../../../core/components/Reference/Callout';
import { ReferenceCard } from '../../../core/components/Reference/Card';
import { Heading } from '../../../core/components/Typography/Heading';
import styles from "./articles.module.css";

export interface ArticlesProps {
  page: any;
  articles?: any;
  footer: any;
  isEditing?: boolean;
  children?: React.ReactChild;
}

export function ArticlesRoute({ page, articles, footer }: ArticlesProps) {
  const [data, form] = useArticlesForm(page.file);
  const [, form2] = useForm({
    id: "example",
    label: "example",
    fields: [],
    initialValues: {
      email: null
    },
    validate: function (values) { return undefined },
    onSubmit: () => undefined
  })
  const featuredArticles = useMemo(() => articles?.filter(article => article.featured === true), [articles]);
  const seo = {
    title: data.title,
    description: data.description
  }

  usePlugin(form2);
  usePlugin(form);

  return (
    <div id={styles.articles}>
      <InlineForm form={form}>
        <MainLayout seo={seo} page={page} footer={footer}>
          <Container>
            <Row>
              <Col>
                <ReferenceCallout
                  title={data.title}
                  body={data.description}
                  image={data.image}
                  variant="dark"
                  className="bg-lightblue"
                />
              </Col>
            </Row>
            {featuredArticles.length > 0 && (
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
                          name: "Chris D. Macrae"
                        }
                      }}
                      key={index}
                    />
                  ))}
                </Col>
              </Row>
            )}
            <Row className="pt-4 pb-4">
              <Col>
                <Heading as="h5" border={true} bold={true}>
                  All Stories
                </Heading>
                {articles.map((article, index) => (
                  <Fragment key={index}>
                    {article.file && (
                      <ReferenceCard
                        size="md"
                        reference={{
                          ...article.file.data,
                          href: `/articles/${article.slug}`,
                          image: article.file.data.featured_image
                        }}
                      />
                    )}
                  </Fragment>
                ))}
              </Col>
            </Row>
          </Container>
        </MainLayout>
      </InlineForm>
    </div>
  );
}

export default ArticlesRoute;