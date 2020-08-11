import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";

export interface ArticleCalloutProps {
  title: string;
  body: string;
}

export function ArticleCallout({ title, body }: ArticleCalloutProps) {
  return (
    <Container>
    <Jumbotron fluid className="bg-lightblue">
      <div className="pl-4 pr-0 h-100">
        <Row className="justify-content-between">
          <Col md="6" className="pt-6 pb-6">
            <h1 className="secondfont mb-3 font-weight-bold">
              {title}
            </h1>
            <p className="mb-3">
              {body}
            </p>
          </Col>
        </Row>
      </div>
      </Jumbotron>
    </Container>
  )
}