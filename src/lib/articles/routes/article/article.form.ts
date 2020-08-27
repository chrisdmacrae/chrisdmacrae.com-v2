import { useGithubJsonForm } from "react-tinacms-github";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";

export const ArticleFormOptions = (name: string) => Object.create({
  label: `Article: ${name}`,
  fields: [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' },
    { name: "heading", component: () => null }
  ]
});

export const useArticleForm = (file: GitFile) => useGithubJsonForm(file, ArticleFormOptions(file.fileRelativePath));