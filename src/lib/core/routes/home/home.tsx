import React from 'react';
import { Field, Form, usePlugin } from 'tinacms';
import { InlineForm, InlineGroup } from 'react-tinacms-inline';
import { Col, Container, Row, SafeAnchor } from 'react-bootstrap';
import { EditableHeading, Heading } from '../../components/Typography/Heading';
import { EditableTimeOfDay } from '../../components/TimeOfDay';
import CoverLayout from '../../layouts/Cover';
import { EditableParagraph } from '../../components/Typography/Paragraph';
import { EditLink } from '../../../cms/components/EditLink';
import { EditableButton } from '../../components/Button';
import { HomeFormOptions, useHomeForm } from './home.form';
import styles from "./home.module.css";

export interface HomeProps {
  file: any;
  isEditing?: boolean;
  children?: React.ReactChild;
}

export default function HomeRoute({ file, isEditing = false }: HomeProps) {
  const [data, form] = useHomeForm(file);
  const page = {
    title: data.title,
    description: data.description
  }

  usePlugin(form);

  return (
    <InlineForm form={form}>
      <CoverLayout page={page}>
        {{
          cover: (
            <Container>
              <Row>
                <Col>
                  <Heading>
                    <EditableTimeOfDay
                      name="cover.subline"
                      morning={data.cover.subline.morning}
                      afternoon={data.cover.subline.afternoon}
                      evening={data.cover.subline.evening}
                    />
                  </Heading>
                  <EditableHeading
                    name="cover.headline"
                    as="h1"
                    bold={true}
                    className="secondfont">
                    {data.cover.headline}
                  </EditableHeading>
                  <EditableParagraph name="cover.body" className="lead">
                    {data.cover.body}
                  </EditableParagraph>
                  <div className={`${styles.coverCta} pt-3`}>
                    {data.cover.ctas.map((cta, i) => {
                      const fields = (() => {
                        let coverFields = HomeFormOptions.fields
                          .filter(field => field.name === "cover")[0];

                        let ctasFields = coverFields.fields
                          .filter(field => field.name === "ctas")[0];

                        return ctasFields.fields;
                      })();

                      console.log(fields, cta);

                      const classNames = [];
                      let children;

                      if (i < data.cover.ctas.length) classNames.push("mr-3");


                      switch (cta.type) {
                        case "button":
                          children = (
                            <SafeAnchor
                              href={isEditing ? "#" : cta.href}
                              className={classNames.join(" ")}
                              key={i}>
                              <EditableButton name="text" className="d-inline-block">
                                {cta.text}
                              </EditableButton>
                            </SafeAnchor>
                          )
                          break;
                        default:
                          children = (
                            <SafeAnchor
                              href={isEditing ? "#" : cta.href}
                              className={classNames.join(" ")}
                              key={i}>
                              <EditableParagraph name="text">
                                {cta.text}
                              </EditableParagraph>
                            </SafeAnchor>
                          )
                      }

                      return (
                        <InlineGroup
                          name={`cover.ctas.${i}`}
                          fields={fields}
                        >
                          {children}
                        </InlineGroup>
                      )
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
    </InlineForm>
  );
}