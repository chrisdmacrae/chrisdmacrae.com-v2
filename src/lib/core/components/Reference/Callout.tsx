import React, { useContext } from "react";
<<<<<<< HEAD
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";
import { useColorScheme } from "../../hooks/useColorScheme";
=======
import { Button, Col, Jumbotron, Row } from "react-bootstrap";
>>>>>>> origin/master
import AppStateContext from "../../state/app";

export interface ReferenceCalloutProps {
  title: string;
  body: string;
  image: string;
  reference?: any;
  variant?: "dark" | "light";
  className?: string;
}

export function ReferenceCallout({ title, body, reference, variant, className }: ReferenceCalloutProps) {
  const { colorScheme } = useContext(AppStateContext);
  const v = variant || (colorScheme === "dark" ? "light" : "dark");

  return (
    <Jumbotron fluid className={`container mb-3 pt-0 pb-0 b-0 position-relative${className ? " " + className : ""}`}>
      <div className="pl-4 pr-0 h-100">
        <Row className="justify-content-between">
          <Col md="6" className="pt-6 pb-6">
            <div className="d-flex flex-column justify-content-center h-100">
              <h1 className={`${v === "dark" ? "text-dark " : "text-light "}secondfont mb-3 font-weight-bold`}>
                {title}
              </h1>
              <p className={`${v === "dark" ? "text-dark " : "text-light "}mb-3`}>
                {body}
              </p>
              {reference && (
                <div>
                  <Button href={reference.href}>{reference.text ?? "Learn more"}</Button>
                </div>
              )}
              </div>
          </Col>
          <Col md="6" className="d-none d-md-block pr-0">
            <img src={image} width="100%" height="auto" style={{objectFit: "cover"}} />
          </Col>
        </Row>
      </div>
    </Jumbotron>
  )
}