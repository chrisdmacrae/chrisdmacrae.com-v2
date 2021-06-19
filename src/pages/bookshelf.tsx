import { getAllBooks } from "cdm-content/books";
import { GetStaticProps } from "next";
import { Bookshelf } from "../views";

export const getStaticProps: GetStaticProps = async () => {
  const props: Record<string, any> = {};
  const books = await getAllBooks();

  props.books = books;

  return {
    props
  }
}

export default Bookshelf;