import { GithubClient, useGithubJsonForm } from "react-tinacms-github";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";
import { useCMS, FormOptions } from "tinacms";
import { Article } from "../../models/article";

type ArticleFormOptions = (...args: any) => Omit<FormOptions<Article>, "onSubmit">;

export const ArticleFormOptions: ArticleFormOptions = (name: string, github: GithubClient) => {
  return {
    id: name,
    label: `Article: ${name}`,
    fields: [
      { name: "title", component: "text" },
      { name: "description", component: 'textarea' },
      {
        name: "featured_image",
        component: "image",
        parse: filename => `/uploads/${filename}`,
        uploadDir: () => '/public/uploads/',
        previewSrc: async (formValues, { input }) => {
          return `https://raw.githubusercontent.com/chrisdmacrae/chrisdmacrae.com/${github.branchName}/public/${input.value}`;
        }
      },
      { name: "hero.variant", component: "select", options: ["Regular", "Featured Image Right", "Featured Image Left"] }
    ]
  }
}

export const useArticleForm = (file: GitFile) => {
  const cms = useCMS();
  const github = cms.api.github as GithubClient;
  const options = ArticleFormOptions(file.data.title || file.fileRelativePath, github);

  return useGithubJsonForm(file, options);
}