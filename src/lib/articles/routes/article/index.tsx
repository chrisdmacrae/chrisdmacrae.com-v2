import { readdirSync, readFileSync } from 'fs';
import slugify from 'slugify';

// @ts-expect-error
const path = __non_webpack_require__('path');

export * from "./article";

export const useArticleData = async (filePathFromContent: string) => JSON.parse(readFileSync(`${process.cwd()}/src/lib/articles/content/articles/${filePathFromContent}`, { encoding: "utf-8" }));

export function getArticleMetaByName (name: string) {
  const fileName = `${name}.json`;
  const articleRelPath = `src/lib/articles/content/articles/${fileName}`;
  const articleAbsolutePath = path.resolve(process.cwd(), `src/lib/articles/content/articles/${fileName}`);

  return {
    slug: name,
    fileName,
    articleRelPath,
    articleAbsolutePath
  }
}

export async function getAllArticlePaths() {
  const articlesDir = path.resolve(process.cwd(), "/src/lib/articles/content/articles")
  const fileNames = readdirSync(articlesDir);

  return fileNames.map(fileName => {
    const slug = slugify(
      fileName
        .replace(/\.json$/, '')
    ) 
 
    return {
      params: {
        article: slug,
        articleRelPath: `${process.cwd()}/src/lib/articles/content/${fileName}`,
        articlePathFromContent: fileName
      }
    }
  })
}