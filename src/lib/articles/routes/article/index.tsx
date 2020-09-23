import { readdirSync, readFileSync } from 'fs';
import { getFiles } from 'next-tinacms-github';
import path from "path";
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import slugify from 'slugify';
import { articlesRelPath } from '../articles';

export * from "./article";

export const useArticleData = async (articleRelPath: string) => {
  return JSON.parse(readFileSync(path.resolve(process.cwd(), articleRelPath), { encoding: "utf-8" }))
};
export const articlesRelDir = 'src/lib/articles/content/articles';

export function getArticleMetaByName (name: string) {
  const fileName = `${name}.json`;
  const articleRelPath = `src/lib/articles/content/articles/${fileName}`;
  const articleAbsolutePath = path.resolve(process.cwd(), articlesRelPath);

  return {
    slug: name,
    fileName,
    articleRelPath,
    articleAbsolutePath
  }
}

export async function getAllArticlePaths(isEditing?: boolean, branch?: string, accessToken?: string) {
  const articlesDir = path.resolve(process.cwd(), articlesRelDir);
  let fileNames = readdirSync(articlesDir);

  if (isEditing) {
    const branchName = branch ?? process.env.BASE_BRANCH;
    const currentAccessToken = accessToken ?? process.env.GITHUB_ACCESS_TOKEN;
    
    fileNames = (await getFiles(articlesRelDir, process.env.REPO_FULL_NAME, branchName, currentAccessToken) as GitFile[])
      .map(file => file.fileRelativePath);
  }

  return fileNames.map(fileName => {
    const slug = slugify(
      fileName
        .replace(/\.json$/, '')
    );
    const articleRelPath = `src/lib/articles/content/articles/${fileName}`;
    const articleAbsolutePath = path.resolve(process.cwd(), articlesRelPath);
 
    return {
      slug,
      fileName,
      articleRelPath,
      articleAbsolutePath
    }
  });
}
