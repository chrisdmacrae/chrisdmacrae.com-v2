export function createGithubLink(fileRelativePath: string) {
  return [
    "https://github.com",
    process.env.REPO_FULL_NAME,
    "blob",
    process.env.BASE_BRANCH,
    fileRelativePath
  ].join("/");
}