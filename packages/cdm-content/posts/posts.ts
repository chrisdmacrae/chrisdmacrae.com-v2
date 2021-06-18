
import { extname, join } from "path";
import { BaseModel, getAllContent, getContentBySlug, getContentPaths } from "cdm-content/content";

export type PostModel = BaseModel & {
  slug: string;
  title: string;
  description: string;
  content: string;
  rawContent: string;
}

export const postsDirectory = join(process.cwd(), 'packages/cdm-content/posts')
export const postBasePath = 'articles';
export const getPostPaths = () => getContentPaths(postsDirectory, ['md']);
export const getPostBySlug = (slug: string, fields = []) => getContentBySlug<PostModel>(slug, postsDirectory, '.md', postBasePath, fields); 
export const getAllPosts = (fields?: string[]) => getAllContent<PostModel>(postsDirectory, ['.md'], postBasePath, fields);

export function getPostSlugs() {
  const slugs = getPostPaths()
    .map(p => `/articles/${p}`)
    .map(p => p.replace(extname(p), ''));

  return slugs;
}