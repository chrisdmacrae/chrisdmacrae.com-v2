import { readdirSync, readFileSync } from 'fs';
import path from "path";
import slugify from 'slugify';
import { getFiles } from 'next-tinacms-github';
import { articlesRelPath } from '../articles';

export * from "./article";

export const useArticleData = async (articleRelPath: string) => {
  return JSON.parse(readFileSync(path.resolve(process.cwd(), articleRelPath), { encoding: "utf-8" }))
};
export const articlesRelDir = 'packages/cdm-content/articles/content/articles';

export function getArticleMetaBySlug (slug: string) {
  const fileName = `${slug}.json`;
  const articleRelPath = `${articlesRelDir}/${fileName}`;
  const articleAbsolutePath = path.resolve(process.cwd(), articlesRelPath);

  return {
    slug: slug,
    fileName,
    articleRelPath,
    articleAbsolutePath
  }
}

export async function getAllArticlePaths(isEditing?: boolean, branch?: string, accessToken?: string) {
  const articlesDir = path.resolve(process.cwd(), articlesRelDir);
  let filePaths;

  if (isEditing) {
    const repoName = process.env.REPO_FULL_NAME;
    const branchName = branch ?? process.env.BASE_BRANCH;
    const currentAccessToken = accessToken ?? process.env.GITHUB_ACCESS_TOKEN;

    filePaths = (await getFiles(articlesRelDir, repoName, branchName, currentAccessToken))
      .map(file => file.replace(articlesRelDir + "/", ""));
  }
  else {
    filePaths = readdirSync(articlesDir);
  }

  return filePaths.map(fileName => {
    const slug = slugify(
      fileName
        .replace(/\.json$/, '')
    );
    const articleRelPath = `${articlesRelDir}/${fileName}`;
    const articleAbsolutePath = path.resolve(process.cwd(), articleRelPath);
 
    return {
      slug,
      fileName,
      articleRelPath,
      articleAbsolutePath
    }
  });
}
