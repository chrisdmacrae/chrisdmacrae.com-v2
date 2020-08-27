import { useGithubJsonForm } from "react-tinacms-github";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";

export const ArticleFormOptions = (name: string) => Object.create({
  label: `Article: ${name}`,
  fields: [
    {
      name: 'edit', component: 'group', fields: [
      { name: "text", component: "text" }
      ]
    },
    {
      name: 'github', component: 'group', fields: [
      { name: "text", component: "text" }
    ] }
  ]
});

export const useFooterForm = (file: GitFile) => useGithubJsonForm(file, ArticleFormOptions(file.fileRelativePath));