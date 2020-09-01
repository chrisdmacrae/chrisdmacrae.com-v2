import { createHash } from "crypto";
import { ContentCreatorPlugin, TinaCMS } from "tinacms";
import { GithubClient } from "react-tinacms-github";
import slugify from "slugify";
import { Article } from "../../articles";

export const ArticleContentCreator: ContentCreatorPlugin<Article> = {
  __type: "content-creator",
  name: "Article",
  fields: [
    { name: "title", label: "Title", component: "text", validate: (title) => title ? undefined : "Required" },
    { name: "description", label: "Description", component: "text", validate: (description) => description ? undefined : "Required" },
    { name: "new-branch", label: "Create in new branch?", component: "toggle" }
  ],
  onSubmit: async (values, cms) => {
    try {
      const github = cms.api.github as GithubClient;
      const now = new Date();
      const dateString = now.toISOString().slice(0,10);
      const slug = `${dateString}-${slugify(values.title)}`.toLowerCase();
      const filePath = `src/lib/articles/content/articles/${slug}.json`;
      const SHA = createHash("sha256");
      const sha = SHA.update(filePath).digest().toString();
      const branch = `article/${slug}`;
      const defaultData: Article = {
        title: "",
        description: "",
        featured_image: undefined,
        author: {
          fullName: "Chris D. Macrae",
          photo: "/uploads/photo_chris.png"
        },
        categories: [],
        hero: {
          variant: "Regular"
        },
        created_date: now.toUTCString(),
        edited_date: now.toUTCString(),
        body: []
      }
      const data: Article = {
        ...defaultData,
        ...values
      }

      delete data["new-branch"];

      // loose coercision on purpose!
      if (values["new-branch"] == true) {
        await github.createBranch(branch);
        await github.setWorkingBranch(branch);
        await fetch("/api/preview", {
          method: "POST",
          body: JSON.stringify({
            cdm_head_branch: branch
          })
        })
      }

      await github
        .commit(filePath, sha, JSON.stringify(data, null, 2), `Created new post ${filePath} with TinaCMS`);
      
      window.location.href = `/articles/${slug}`;
    } catch (error) {
      (cms as TinaCMS).alerts.error(error.message);

      console.error(error);
    }
  }
}