import React from "react";
import { Figure as BootstrapFigure, Media } from "react-bootstrap";

export type FigureVariants = 
  "full-width" |
  "pull-left" |
  "pull-right" |
  "regular"

export interface FigureProps {
  variant?: FigureVariants
}

export function Figure({variant}: FigureProps) {
  switch (variant) {
    case "full-width":
      return <FigureFullWidth />;
    case "pull-left":
      return <FigurePulled alignment="left" />
    case "pull-right":
      return <FigurePulled alignment="right" />
    default:
      return <FigureRegular />;
  }
}

function FigureRegular() {
  return (
    <BootstrapFigure>
      <BootstrapFigure.Image
        alt="TODO"
        title="TODO"
        src="https://images.unsplash.com/photo-1593642703013-5a3b53c965f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80"
        className="d-block"
      />
      <BootstrapFigure.Caption className="d-block">
        <small className="text-muted">
          An image that is very nice...
        </small>
      </BootstrapFigure.Caption>
    </BootstrapFigure>
  )
}

function FigureFullWidth() {
  return (
    <BootstrapFigure style={{margin: "0 -20vw"}}>
      <BootstrapFigure.Image
        alt="TODO"
        title="TODO"
        src="https://images.unsplash.com/photo-1593642703013-5a3b53c965f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80"
        className="d-block"
      />
      <BootstrapFigure.Caption className="d-block">
        <small className="text-muted">
          An image that is very nice...
        </small>
      </BootstrapFigure.Caption>
    </BootstrapFigure>
  );
}

function FigurePulled({ alignment }) {
  return (
    <div>
      <BootstrapFigure className={alignment === "right" ? "pl-4" : "pr-4"} style={{ position: "absolute", top: 0, left: alignment === "left" ? "-50%" : 0, right: alignment === "right" ? "-50%" : 0, maxWidth: "50%" }}>
        <BootstrapFigure.Image
          alt="TODO"
          title="TODO"
          src="https://images.unsplash.com/photo-1593642703013-5a3b53c965f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80" />
        <BootstrapFigure.Caption className="d-block">
          <small className="text-muted">
            An image that is very nice...
          </small>
        </BootstrapFigure.Caption>
      </BootstrapFigure>
    </div>
  );
}