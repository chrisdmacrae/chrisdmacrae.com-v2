import { readdirSync, readFileSync } from "fs";
import { extname, join } from "path";
import matter from "gray-matter";
import markdownToHtml from "./markdownToHtml";

export type BaseModel = {
  slug: string;
  created: Date;
  updated: Date;
  excerpt?: string;
  content?: string;
  rawContent?: string;
  createdBy: Author
} & {
  [key: string]: any;
}

export type Author = {
  firstName: string;
  lastName: string;
  bio: string;
  avatar?: string;
}

export function getContentPaths(directoryPath: string, ext: string[]) {
  return readdirSync(directoryPath)
    .filter(f => ext.includes(extname(f)))
}

export async function getContentBySlug<ContentShape extends BaseModel>(slug: string, directoryPath: string, ext: string, basePath: string = '', fields: string[] = []): Promise<BaseModel> {
  const realSlug = join(basePath, slug)
    .replace(ext, '');
  const realPath = slug.replace(basePath, '')
    .replace(ext, '');
  const fullPath = join(directoryPath, `${realPath}`) + ext;
  const fileContents = readFileSync(fullPath, 'utf8')
  let data: any;
  let post = {} as ContentShape

  if (ext.includes('md')) {
    const res = matter(fileContents)

    data = res.data;
    data.rawContent = res.content;
    data.excerpt = res.excerpt;
    data.content = await markdownToHtml(res.content);
  }

  if (ext.includes('json')) {
    data = JSON.parse(fileContents);
  }

  if (data?.draft && process.env.IS_PRODUCTION) {
    return null;
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (data[field]) {
      post = data[field]
    }

    if (field === 'created' || field === 'updated') {
      post[field] = new Date(data[field]);
    }

    if (field === 'slug') {
      post[field] = realSlug
    }

    if (field === 'content') {
      post[field] = data.content;
    }

    if (field === 'rawContent') {
      post[field] = data.content
    }
  })

  if (fields.length === 0) {
    post = { 
      ...data,
      updated: new Date(data.updated).toDateString(), 
      created: new Date(data.created).toDateString(),
      slug: realSlug
    } as ContentShape
  }

  if (post.rawContent && ext === 'markdown') {
    post.content = await markdownToHtml(post.content)
  }

  return post as ContentShape
}

export async function getAllContent<ContentShape extends BaseModel>(directory: string, ext: string[], basePath: string = '', fields = []) {
  const slugs = await getContentPaths(directory, ext);
  const content = await Promise.all(slugs
    .map((slug) => getContentBySlug(slug, directory, extname(slug), basePath , fields))
    .filter(c => c !== null));

  // sort content by date in descending order
  return content
    .sort((post1, post2) => post1.updated ?
      (post1.updated > post2.updated ? -1 : 1) :
      (post1.created > post2.created ? -1 : 1)) as ContentShape[]
}