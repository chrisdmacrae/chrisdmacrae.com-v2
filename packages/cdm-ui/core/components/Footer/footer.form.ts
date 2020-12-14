import { useGithubJsonForm } from "react-tinacms-github";
import { GitFile } from "react-tinacms-github/dist/src/form/useGitFileSha";

export const FooterFormOptions = {
  label: 'Footer',
  fields: [
    {
      name: 'editing', component: 'group', fields: [
        { name: "enabled.text", component: "text" },
        { name: "disabled.text", component: "text" }
      ]
    },
    {
      name: 'github', component: 'group', fields: [
        { name: "text", component: "text" }
      ]
    }
  ]
}

export const useFooterForm = (file: GitFile) => useGithubJsonForm(file, FooterFormOptions);