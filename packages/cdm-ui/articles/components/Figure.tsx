import { Media } from "react-bootstrap";

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
    case "pull-right":
      return null;
    default:
      return null;
  }
}

function FigureFullWidth() {
  return (
    <Media>
      <img
        alt="TODO"
        title="TODO"
        src="https://images.unsplash.com/photo-1593642703013-5a3b53c965f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80" />
      <Media.Body className="d-block">
        <p>
          An image that is very nice...
        </p>
      </Media.Body>
    </Media>
  )
}