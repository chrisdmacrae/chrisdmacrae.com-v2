import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { BaseModel } from "../model";
import markdownToHtml from "cdm-content/markdownToHtml";

export type PostModel = BaseModel & {
  title: string;
  description: string;
  content: string;
  rawContent: string;
}

const postsDirectory = join(process.cwd(), 'packages/cdm-content/posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('md'))
}

export async function getPostBySlug(slug, fields = []): Promise<PostModel> {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  let post = {} as PostModel

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (data[field]) {
      post[field] = data[field]
    }

    if (field === 'created' || field === 'updated') {
      post[field] = new Date(data[field]).toDateString()
    }

    if (field === 'slug') {
      post[field] = realSlug
    }

    if (field === 'content') {
      post[field] = content;
    }

    if (field === 'rawContent') {
      post[field] = content
    }
  })

  if (fields.length === 0) {
    post = { ...data, rawContent: content, content, updated: new Date(data.updated).toDateString(), created: new Date(data.created).toDateString() } as PostModel
  }

  if (post.content) {
    post.content = await markdownToHtml(post.content)
  }

  return post
}

export async function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs
    .map((slug) => getPostBySlug(slug, fields)))

  // sort posts by date in descending order
  return posts.sort((post1, post2) => post1.updated ?
    (post1.updated > post2.updated ? -1 : 1) :
    (post1.created > post2.created ? -1 : 1))
}