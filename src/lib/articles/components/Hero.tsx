import { Jumbotron } from "react-bootstrap";

export interface ArticleHeroProps {
  className?: string;
  variant: "featured-right"
}

export function ArticleHero(props: ArticleHeroProps) {
  return (
    <Jumbotron className="container mb-3 pl-0 pt-0 pb-0 bg-transparent position-relative" fluid>
      <h1>Hello world</h1>
    </Jumbotron>
  );
}