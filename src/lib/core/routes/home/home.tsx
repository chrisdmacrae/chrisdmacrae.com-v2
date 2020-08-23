import React from 'react';
import { usePlugin } from 'tinacms';
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
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import { createGithubLink } from '../../utils/createGithubLink';

export interface HomeProps {
  file: any;
  isEditing?: boolean;
  children?: React.ReactChild;
}

export default function HomeRoute({ file, isEditing = false }: HomeProps) {
  const [data, form] = useHomeForm(file);
  const repo_path = createGithubLink((file as GitFile).fileRelativePath);
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
                  <Row className={`${styles.coverCta} align-items-center pt-3`}>
                    {data.cover.ctas.map((cta, i) => {
                      const fields = (() => {
                        let coverFields = HomeFormOptions.fields
                          .filter(field => field.name === "cover")[0];

                        let ctasFields = coverFields.fields
                          .filter(field => field.name === "ctas")[0];

                        return ctasFields.fields;
                      })();
                      let children;

                      switch (cta.type) {
                        case "button":
                          children = (
                            <EditableButton name="text" className="d-inline-block">
                              {cta.text}
                            </EditableButton>
                          );
                          break;
                        default:
                          children = (
                            <EditableParagraph name="text" className="mb-0">
                              {cta.text}
                            </EditableParagraph>
                          );
                      }

                      return (
                        <Col xs="auto" key={i}>
                          <InlineGroup
                            name={`cover.ctas.${i}`}
                            fields={fields}>
                            <SafeAnchor
                              href={isEditing ? "#" : cta.href}
                              key={i}>
                              {children}
                            </SafeAnchor>
                          </InlineGroup>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </Container>
          ),
          coverFooter: (
            <Container>
              <Row>
                <Col>
                  <SafeAnchor href="#" className="text-gray mr-3">
                    <EditLink editMode={isEditing} />
                  </SafeAnchor>
                  <SafeAnchor href={repo_path} className="text-gray">
                    View on GitHub
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