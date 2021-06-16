import { getAllPosts, getPostBySlug, getPostSlugs } from "cdm-content";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArticlePage } from "../../views/Article";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPostSlugs();

  return {
    paths: posts,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: Record<string, any> = {};
  const slug = context.params.slug;
  const posts = await getAllPosts();
  const post = await getPostBySlug(slug);
  const postIndex = posts?.findIndex(p => p.slug === `/articles/${post.slug}`);
  const prev = postIndex > -1 ? posts[postIndex + 1] : null;
  const next = postIndex > -1 ? posts[postIndex - 1] : null;

  props.post = post;
  if (next) props.next = next;
  if (prev) props.prev = prev || null;

  return {
    props
  }
}

export default ArticlePage;