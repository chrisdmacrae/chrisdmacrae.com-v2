import { Block } from "react-tinacms-inline";
import { ArticleHeroProps } from "../../../cdm-ui/articles/components/Hero";

export interface Article {
  title: string;
  description: string;
  featured_image: string | undefined;
  created_date: string | Date;
  edited_date: string | Date;
  categories: [] | [{
      title: string
      href: string
  }],
  author: {
    fullName: string,
    photo: string
  },
  hero: {
    variant: ArticleHeroProps['variant'];
  }
  body: Block[]
}