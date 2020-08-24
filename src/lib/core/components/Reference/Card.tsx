import React from "react";
import { Card } from "react-bootstrap";

export interface ReferenceCardProps {
  size: "lg" | "md" | "sm",
  reference: any
}

export function ReferenceCard({ size, reference }: ReferenceCardProps) {
  switch (size) {
    case "lg":
      return <LargeReferenceCard reference={reference} />;
    case "md":
      return <MediumReferenceCard reference={reference} />;
    case "sm":
      return <SmallReferenceCard reference={reference} />;
  }
}

export function LargeReferenceCard({ reference }: Omit<ReferenceCardProps, "size">) {
  return (
    <Card className="border-0 mb-4 box-shadow h-xl-300">
      <img height="150" src="./assets/img/demo/blog4.jpg" style={{objectFit: "cover"}} />
      <Card.Body className="px-0 pb-0">
        <h2>
          <a className="text-dark" href={reference.href}>
            {reference.title}
          </a>
        </h2>
        <Card.Text as="p">
          {reference.description}
        </Card.Text>
        <div>
          {reference.author && (
            <small className="d-block">
              <a className="text-muted" href={reference.author.href}>
                {reference.author.name}
              </a>
            </small>
          )}
          {reference.createdDate || reference.editedDate && (
            <small className="text-muted">
              {reference.editedDate ?? reference.createdDate}
              {reference.readingTime}
            </small>
          )}
        </div>
      </Card.Body>
    </Card>
  ); 
}

export function MediumReferenceCard({ reference }: Omit<ReferenceCardProps, "size">) {
  return (
    <div className="mb-3 d-flex justify-content-between">
      <div className="pr-3">
        <h2 className="mb-1 h4 font-weight-bold">
        <a className="text-dark" href="./article.html">Nearly 200 Great Barrier Reef coral species also live in the deep sea</a>
        </h2>
        <p>
          There are more coral species lurking in the deep ocean that previously thought.
        </p>
        <div className="card-text text-muted small">
            Jake Bittle in SCIENCE
        </div>
        <small className="text-muted">Dec 12 &middot; 5 min read</small>
      </div>
      <img height="120" src="./assets/img/demo/blog8.jpg" />
    </div>
  );
}

export function SmallReferenceCard({ reference }: Omit<ReferenceCardProps, "size">) {
  return (
    <>
      <div className="mb-4 box-shadow h-xl-300">
        <div className="mb-3 d-flex align-items-center">
          <img height="80" src="./assets/img/demo/blog4.jpg" />
          <div className="pl-3">
            <h2 className="mb-2 h6 font-weight-bold">
            <a className="text-dark" href="./article.html">Nasa's IceSat space laser makes height maps of Earth</a>
            </h2>
            <div className="card-text text-muted small">
                Jake Bittle in LOVE/HATE
            </div>
            <small className="text-muted">Dec 12 &middot; 5 min read</small>
          </div>
        </div>
      </div>
    </>
  );
}