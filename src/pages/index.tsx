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
    fields: [
      { name: 'title', component: 'text' },
      { name: 'description', component: 'textarea' },
      {
        name: 'cover', component: 'group', fields: [
          {
            name: 'subline', component: 'group', fields: [
              { name: 'morning', component: 'text' },
              { name: 'afternoon', component: 'text' },
              { name: 'evening', component: 'text' }
            ]
          },
          { name: 'headline', component: 'text' },
          { name: 'body', component: 'textarea' },
          {
            name: 'ctas', component: 'group-list', fields: [
              { name: 'text', component: 'text ' },
              { name: 'href', component: 'text' }
            ]
          }
        ]
      }
    ]
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
                    morning={data.cover.subline.morning}
                    afternoon={data.cover.subline.afternoon}
                    evening={data.cover.subline.evening}
                  />
                </Heading>
                <Heading as="h1" bold={true} className="secondfont">
                  {data.cover.headline}
                </Heading>
                <Paragraph className="lead">
                  {data.cover.body}
                </Paragraph>
                <div className="pt-3">
                  {data.cover.ctas.map((cta, i) => {
                    const classNames = [];

                    if (i < data.cover.ctas.length) classNames.push("mr-3");

                    switch (cta.type) {
                      case "button":
                        return (
                          <SafeAnchor
                            href={cta.href}
                            className={classNames.join(" ")}
                            key={i}>
                            <Button>
                              {cta.text}
                            </Button>
                          </SafeAnchor>
                        )
                      default:
                        return (
                          <SafeAnchor
                            href={cta.href}
                            className={classNames.join(" ")}
                            key={i}>
                            {cta.text}
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
  let props = {
    sourceProvider: null,
    error: null,
    preview: false,
    file: {
      fileRelativePath: 'content/home.json',
      data: (await import('../content/home.json')).default,
    }
  }

  if (!process.env.IS_PRODUCTION) {
    props = Object.assign(props, {
      isEditing: true
    });
  }

  if (preview) {
    props = {
      ...props,
      ...await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'content/home.json',
        parse: parseJson,
      })
    }
  }

  return {
    props: props
  }
}