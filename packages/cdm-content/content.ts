import { readdirSync, readFileSync, statSync } from "fs";
import { extname, join, posix } from "path";
import matter from "gray-matter";
import markdownToHtml from "./markdownToHtml";

export type BaseModel = {
  slug: string;
  created: string;
  updated: string;
  excerpt?: string;
  content?: string;
  rawContent?: string;
  textContent?: string;
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

export function getContentPaths(directoryPath: string, ext: string[], baseDir: string =  '') {
  const res = readdirSync(directoryPath)

  return res
    .reduce((paths: string[], path: string) => {
      const fullPath = join(directoryPath, path)

      if (statSync(fullPath).isDirectory()) {
        const subPaths = getContentPaths(fullPath, ext, path)

        paths = paths.concat(subPaths)
      }
      else if (!paths.includes(path)) {
        paths.push(join(baseDir, path))
      }

      return paths
    }, [])
    .filter(f => ext.includes(extname(f)))
}

export async function getContentBySlug<ContentShape extends BaseModel>(slug: string, directoryPath: string, ext: string, basePath: string = '', fields: string[] = []): Promise<BaseModel> {
  const realSlug = posix.normalize(join('/', basePath, slug)
    .replace(ext, '')
    .replace(`\\`, '/')
    .replace('/index', '')
  );
  const realPath = slug.replace(basePath, '')
    .replace(ext, '');
    
  let fullPath: string;
  try {
    const object = await statSync(join(directoryPath, realPath))

    if (object.isDirectory()) {
      fullPath = join(directoryPath, realPath, '/index') + ext
    }
  }
  catch {
    fullPath = join(directoryPath, realPath) + ext
  }

  const fileContents = readFileSync(fullPath, 'utf8')
  const fileMeta = statSync(fullPath);
  let data: any;
  let post = {} as ContentShape

  if (ext.includes('md')) {
    const res = matter(fileContents)

    data = res.data;
    data.rawContent = res.content;
    data.excerpt = res.excerpt;
    data.content = await markdownToHtml(res.content);
    data.textContent = res.content.replace(/<\/?[^>]+(>|$)/g, "")
  }

  if (ext.includes('json')) {
    data = JSON.parse(fileContents);
  }

  if (data?.draft && process.env.IS_PRODUCTION || data === null) {
    return null;
  }

  const created = data.created ? new Date(data.created).toLocaleDateString() : fileMeta.birthtime.toLocaleDateString();
  const updated = data.updated ? new Date(data.updated).toLocaleDateString() : created;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (data[field]) {
      post = data[field]
    }

    if (field === 'created') {
      post[field] = created;
    }

    if (field === 'updated') {
      post[field] = updated;
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
      created,
      updated, 
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
  const content = await Promise.all(
    slugs
      .map((slug) => getContentBySlug(slug, directory, extname(slug), basePath , fields))
  );

  // sort content by date in descending order
  return content
    .filter(c => c !== null)
    .sort((post1, post2) => post1?.updated ?
      (new Date(post2?.updated).getUTCMilliseconds() > new Date(post1?.updated).getUTCMilliseconds() ? 1 : -1) :
      (new Date(post2?.created).getUTCMilliseconds() > new Date(post1?.created).getUTCMilliseconds()) ? 1 : -1) as ContentShape[]
}