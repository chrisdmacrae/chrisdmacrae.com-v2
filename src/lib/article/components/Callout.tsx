import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";

export interface ArticleCalloutProps {}

export function ArticleCallout(props: ArticleCalloutProps) {
  return (
    <Container>
    <Jumbotron fluid>
      <div className="pl4 pro-o h-100">
        <Row>
          <Col md="6" className="pt-6 pb-6">
            <h1 className="secondfont mb-3 font-weight-bold">Mundana is an HTML Bootstrap Template for Professional Blogging</h1>
            <p className="mb-3">
              Beautifully crafted with the latest technologies, SASS &amp; Bootstrap 4.1.3, Mundana is the perfect design for your professional blog. Homepage, post article and category layouts available.
            </p>
          </Col>
          <Col md="6" className="pr-0">
            <div style={{backgroundSize: 'cover', backgroundImage: 'url(./assets/img/demo/home.jpg)'}} />
          </Col>
        </Row>
      </div>
      </Jumbotron>
    </Container>
  )
}