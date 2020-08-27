import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InlineBlocks, InlineForm, InlineGroup } from "react-tinacms-inline";
import { Field, usePlugin } from "tinacms";
import MainLayout from "../../../core/layouts/Main";
import RichTextBlock from "../../blocks/RichText";
import { ArticleHero } from "../../components/Hero";
import { useArticlesForm } from "../articles/articles.form";

export function ArticleRoute({ file }) {
  const [data, form] = useArticlesForm(file);
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
              <InlineGroup name="" fields={[
                { name: "title", component: "text" },
                { name: "hero.variant", component: "select", options: ["featured-right", "featured-left"] } as Field<any>
              ]}>
                <ArticleHero article={data} variant={data.hero.variant} />
              </InlineGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12" lg={{
              span: "8",
              offset: "2"
            }}>
              <article className="article-post">
                  <InlineBlocks name="body" blocks={{
                    richText: RichTextBlock
                  }} />
                </article>
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </InlineForm>
  )
}

export default ArticleRoute;