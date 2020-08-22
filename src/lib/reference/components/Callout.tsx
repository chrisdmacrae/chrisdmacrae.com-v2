import React from "react";
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";

export interface ReferenceCalloutProps {
  title: string;
  body: string;
  reference?: any;
}

export function ReferenceCallout({ title, body, reference }: ReferenceCalloutProps) {
  return (
    <Container>
    <Jumbotron fluid className="mb-3 pt-0 pb-0 b-0 bg-lightblue position-relative">
      <div className="pl-4 pr-0 h-100">
        <Row className="justify-content-between">
          <Col md="6" className="pt-6 pb-6">
            <h1 className="secondfont mb-3 font-weight-bold">
              {title}
            </h1>
            <p className="mb-3">
              {body}
            </p>
            {reference && (
              <Button href={reference.href}>{reference.text ?? "Learn more"}</Button>
            )}
            </Col>
            <Col md="6" className="d-none d-md-block pr-0">
              <img width="100%" height="100%" style={{objectFit: "cover"}} />
            </Col>
        </Row>
      </div>
      </Jumbotron>
    </Container>
  )
}