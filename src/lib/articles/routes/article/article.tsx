import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InlineBlocks, InlineForm, InlineGroup } from "react-tinacms-inline";
import { usePlugin } from "tinacms";
import MainLayout from "../../../core/layouts/Main";
import FigureBlock from "../../blocks/Figure";
import RichTextBlock from "../../blocks/RichText";
import { ArticleHero } from "../../components/Hero";
import { useArticleForm } from "./article.form";

export interface ArticleRouteProps {
  page: any;
  footer: any;
}

export function ArticleRoute({ page, footer }: ArticleRouteProps) {
  console.log(page);
  const [data, form] = useArticleForm(page.file);
  const seo = {
    title: data.title,
    description: data.description
  }

  usePlugin(form);

  return (
    <InlineForm form={form}>
      <MainLayout seo={seo} page={page} footer={footer}>
        <Container>
          <Row className="mb-5">
            <Col>
              <InlineGroup name="" insetControls={true} fields={form.fields}>
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
                  richText: RichTextBlock,
                  figure: FigureBlock
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