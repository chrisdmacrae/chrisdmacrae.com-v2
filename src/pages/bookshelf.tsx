import { GetStaticProps } from "next";
import { Bookshelf } from "../views/Bookshelf";

const BOOKS = [
  {
    title: "Example Book",
    description: "A convenient description",
    author: "Dude McGee",
    rating: 4,
    src: "https://images-na.ssl-images-amazon.com/images/P/1984877712.01._SCLZZZZZZZ_.jpg"
  },
  {
    title: "Example Book",
    description: "A convenient description",
    author: "Dude McGee",
    rating: 4,
    src: "https://images-na.ssl-images-amazon.com/images/P/1984877712.01._SCLZZZZZZZ_.jpg"
  },
  {
    title: "Example Book",
    description: "A convenient description",
    author: "Dude McGee",
    rating: 4,
    src: "https://images-na.ssl-images-amazon.com/images/P/1984877712.01._SCLZZZZZZZ_.jpg"
  },
  {
    title: "Example Book",
    description: "A convenient description",
    author: "Dude McGee",
    rating: 4,
    src: "https://images-na.ssl-images-amazon.com/images/P/1984877712.01._SCLZZZZZZZ_.jpg"
  }
]

export const getStaticProps: GetStaticProps = async () => {
  const props: Record<string, any> = {};

  props.books = BOOKS;

  return {
    props
  }
}

export default Bookshelf;