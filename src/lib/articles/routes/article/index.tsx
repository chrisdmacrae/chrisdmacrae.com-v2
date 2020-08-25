import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import slugify from 'slugify';

export * from "./article";

export const useArticleData = async (filePathFromContent: string) => readFileSync(`./content/${filePathFromContent}`);

export async function getAllArticlePaths() {
  const fileNames = readdirSync(resolve(__dirname, "./content"));

  return fileNames.map(fileName => {
    return {
      params: {
        article: slugify(fileName.replace(/\.md$/, '')),
        articleRelPath: `${__dirname}/content/${fileName}`,
        articlePathFromContent: fileName
      }
    }
  })
}