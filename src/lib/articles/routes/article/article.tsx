import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InlineForm } from "react-tinacms-inline";
import MainLayout from "../../../core/layouts/Main";
import { ArticleHero } from "../../components/Hero";
import { useArticlesForm } from "../articles/articles.form";

export function ArticleRoute({ file, isEditing }) {
  const [data, form] = useArticlesForm(file);
  const page = {
    title: data.title,
    description: data.description
  }

  return (
    <InlineForm form={form}>
      <MainLayout page={page}>
        <Container>
          <Row>
            <Col>
              <ArticleHero variant="featured-right" />
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </InlineForm>
  )
}

export default ArticleRoute;