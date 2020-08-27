import { readdirSync, readFileSync } from 'fs';
import slugify from 'slugify';

export * from "./article";

export const useArticleData = async (filePathFromContent: string) => JSON.parse(readFileSync(`${process.cwd()}/src/lib/articles/content/${filePathFromContent}`, { encoding: "utf-8" }));

export async function getArticleMetaByName (name: string) {
  const fileName = `${name}.json`;
  const articleRelPath = `${process.cwd()}/src/lib/articles/content/${fileName}`;

  return {
    fileName,
    articleRelPath
  }
}

export async function getAllArticlePaths() {
  const fileNames = readdirSync(`${process.cwd()}/src/lib/articles/content/`);

  return fileNames.map(fileName => {
    return {
      params: {
        article: slugify(fileName.replace(/\.json$/, '')),
        articleRelPath: `${process.cwd()}/src/lib/articles/content/${fileName}`,
        articlePathFromContent: fileName
      }
    }
  })
}