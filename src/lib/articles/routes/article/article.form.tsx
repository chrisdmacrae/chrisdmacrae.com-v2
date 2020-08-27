import { useGithubJsonForm } from "react-tinacms-github";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";

export const ArticleFormOptions = (name: string) => {
  return {
    id: name,
    label: `Article: ${name}`,
    fields: [
      { name: "title", component: "text" },
      { name: 'description', component: 'textarea' },
      { name: "hero.variant", component: "select", options: ["featured-right", "featured-left"] }
    ]
  }
}

export const useArticleForm = (file: GitFile) => {
  const options = ArticleFormOptions(file.data.title || file.fileRelativePath);

  return useGithubJsonForm(file, options);
}