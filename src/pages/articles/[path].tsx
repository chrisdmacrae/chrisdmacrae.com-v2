import { getAllPosts, getPostBySlug } from "cdm-content";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArticlePage } from "../../views/Article";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(p => ({ params: { path: p.slug.replace('/articles/', '') }}));
  
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: Record<string, any> = {};
  const path = Array.isArray(context.params.path) ? context.params.path.join('/') : context.params.path;
  const posts = await getAllPosts();
  const post = await getPostBySlug(path);

  if (post === null) {
    return {
      notFound: true
    }
  }

  const postIndex = posts?.findIndex(p => p.slug === post.slug);
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
// export default withPageEditing(ArticlePage);