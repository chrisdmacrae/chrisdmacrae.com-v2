import React from 'react';
import { GetStaticProps } from 'next'
import { usePlugin } from 'tinacms';
import { useGithubJsonForm } from 'react-tinacms-github';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { Button, Col, Container, Row, SafeAnchor } from 'react-bootstrap';
import { Heading } from '../lib/core/components/Typography/Heading';
import { TimeOfDay } from '../lib/core/components/TimeOfDay';
import CoverLayout from '../lib/core/layouts/Cover';
import { Paragraph } from '../lib/core/components/Typography/Paragraph';
import { EditLink } from '../lib/cms/components/EditLink';

export default function PrettyPage({ file, isEditing }) {
  const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  }
  const [data, form] = useGithubJsonForm(file, formOptions);
  const page = {
    title: data.title,
    description: data.description
  }

  usePlugin(form);

  return (
    <CoverLayout page={page}>
      {{
        cover: (
          <Container>
            <Row>
              <Col>
                <Heading>
                  <TimeOfDay
                    morning="Good morning, friend 👋"
                    afternoon="Good afternoon, friend 👋"
                    evening="Good evening, friend 👋"
                  />
                </Heading>
                <Heading as="h1" bold={true} className="secondfont">
                  I'm Chris, and I like figuring out what makes the world tick.
                </Heading>
                <Paragraph className="lead">
                  I'm working on a new website, and I'm designing it in the open.
                </Paragraph>
                <div className="pt-3">
                  {data.cover.ctas.map((cta, i) => {
                    switch (cta.type) {
                      case "button":
                        return (
                          <SafeAnchor
                            href="https://github.com/chrisdmacrae/chrisdmacrae.com/issues/6"
                            className="mr-3"
                            key={i}>
                            <Button>
                              Learn more
                            </Button>
                          </SafeAnchor>
                        )
                      default:
                        return (
                          <SafeAnchor href="https://twitter.com/chrisdmacrae" key={i}>
                            or follow me on Twitter.
                          </SafeAnchor>
                        )
                    }
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        ),
        coverFooter: !process.env.IS_PRODUCTION && (
          <Container>
            <Row>
              <Col>
                <SafeAnchor href="#" className="text-gray">
                  <EditLink editMode={isEditing} />
                </SafeAnchor>
              </Col>
            </Row>
          </Container>),
        default: (<></>)
      }}
    </CoverLayout>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}