import { getAllPosts } from "cdm-content";
import { GetStaticProps } from "next";
import { Homepage } from "../views/Homepage";

export const getStaticProps: GetStaticProps = async () => {
  const props: Record<string, any> = {};
  const posts = await getAllPosts();

  props.posts = posts;

  return {
    props
  }
}

export default Homepage;