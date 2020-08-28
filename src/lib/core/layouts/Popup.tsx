import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BaseLayout, { BaseLayoutProps } from "./Base";

export interface PopupLayout {
  children: React.ReactElement;
}

export interface PopupLayoutProps extends BaseLayoutProps { }

export function PopupLayout({ seo, children }: PopupLayoutProps) {
  return (
    <BaseLayout seo={seo}>
      <Container>
        <Row>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </BaseLayout>    
  )
}