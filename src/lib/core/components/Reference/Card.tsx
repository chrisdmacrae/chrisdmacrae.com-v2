import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { getArticleContent } from "../../../articles/utils/getArticleContent";
import { getPostTime } from "../../../articles/utils/postTime";
import { getReadingTime } from "../../../articles/utils/readingTime";
import AppStateContext from "../../state/app";

export interface ReferenceCardProps {
  size: "lg" | "md" | "sm";
  reference: any;
  variant?: "dark" | "light";
  className?: string;
}

export function ReferenceCard({ size, reference, variant, className }: ReferenceCardProps) {
  const { colorScheme } = useContext(AppStateContext);
  const v = variant || (colorScheme === "dark" ? "light" : "dark");

  switch (size) {
    case "lg":
      return <LargeReferenceCard reference={reference} variant={v} className={className} />;
    case "md":
      return <MediumReferenceCard reference={reference} variant={v} className={className} />;
    case "sm":
      return <SmallReferenceCard reference={reference} variant={v} className={className} />;
  }
}

export function LargeReferenceCard({ reference, variant, className }: Omit<ReferenceCardProps, "size">) {
  return (
    <Card className={`border-0 mb-4 box-shadow bg-transparent h-xl-300${className ? " " + className : ""}`}>
      <img height="150" src="./assets/img/demo/blog4.jpg" style={{objectFit: "cover"}} />
      <Card.Body className="px-0 pb-0">
        <h2>
          <a className={`${variant === "dark" ? "text-dark " : "text-light "}`} href={reference.href}>
            {reference.title}
          </a>
        </h2>
        <Card.Text as="p" className={`${variant === "dark" ? "text-dark " : "text-light "}`}>
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
              {getPostTime(reference.created_date)} · {getReadingTime(getArticleContent(reference.body))}
            </small>
          )}
        </div>
      </Card.Body>
    </Card>
  ); 
}

export function MediumReferenceCard({ reference, variant, className }: Omit<ReferenceCardProps, "size">) {
  return (
    <div className={`mb-3 d-flex justify-content-between${className ? " " + className : ""}`}>
      <div className="pr-3">
        <h2 className="mb-1 h4 font-weight-bold">
          <a className={`${variant === "dark" ? "text-dark " : "text-light "}`} href={reference.href}>
            {reference.title}
          </a>
        </h2>
        <p className={`${variant === "dark" ? "text-dark " : "text-light "}`}>
          {reference.description}
        </p>
        {reference.author && (
          <div className="card-text text-muted small">
            <a className="text-muted" href={reference.author.href}>
              {reference.author.fullName}
            </a>
          </div>
        )}
        <small className="text-muted">
          {getPostTime(reference.created_date)} · {getReadingTime(getArticleContent(reference.body))}
        </small>
      </div>
      <img height="120" width="120" src={reference.image} style={{objectFit: "cover"}} />
    </div>
  );
}

export function SmallReferenceCard({ reference, variant, className }: Omit<ReferenceCardProps, "size">) {
  return (
    <>
      <div className={`mb-4 box-shadow ${className ? " " + className : ""}`}>
        <div className="mb-3 d-flex align-items-center">
          <img height="80" src="./assets/img/demo/blog4.jpg" />
          <div className="pl-3">
            <h2 className="mb-2 h6 font-weight-bold">
              <a className={`${variant === "dark" ? "text-dark " : "text-light "}`} href={reference.href}>
                {reference.title}
              </a>
            </h2>
            <div className="card-text text-muted small">
              {reference.description}
            </div>
            <small className="text-muted">
              {getPostTime(reference.created_date)} · {getReadingTime(getArticleContent(reference.body))}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}