import { readdirSync, readFileSync } from 'fs';
import { getFiles } from 'next-tinacms-github';
import path from "path";
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import slugify from 'slugify';

export * from "./article";

export const useArticleData = async (articleRelPath: string) => JSON.parse(readFileSync(path.resolve(process.cwd(), articleRelPath), { encoding: "utf-8" }));
export const articlesRelDir = "src/lib/articles/content/articles"

export function getArticleMetaByName (name: string) {
  const fileName = `${name}.json`;
  const articleRelPath = path.join(articlesRelDir, fileName);
  const articleAbsolutePath = path.resolve(process.cwd(), articleRelPath);

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
    
    fileNames = (await getFiles(articlesDir, process.env.REPO_FULL_NAME, branchName, currentAccessToken) as GitFile[])
      .map(file => file.fileRelativePath);
  }

  return fileNames.map(fileName => {
    const slug = slugify(
      fileName
        .replace(/\.json$/, '')
    );
    const articleRelPath = path.resolve(articlesRelDir, fileName);
    const articleAbsolutePath = path.resolve(process.cwd(), articleRelPath);
 
    return {
      slug,
      fileName,
      articleRelPath,
      articleAbsolutePath
    }
  });
}
