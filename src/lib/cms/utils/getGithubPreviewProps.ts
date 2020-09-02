import { getGithubPreviewProps, parseJson } from "next-tinacms-github";

export async function getGithubPreviewData(fileRelativePath: string, previewData: any) {
  return await getGithubPreviewProps({
    fileRelativePath: fileRelativePath,
    parse: parseJson,
    working_repo_full_name: process.env.REPO_FULL_NAME,
    github_access_token: process.env.GITHUB_ACCESS_TOKEN,
    head_branch: process.env.BASE_BRANCH,
    ...previewData
  });      
}