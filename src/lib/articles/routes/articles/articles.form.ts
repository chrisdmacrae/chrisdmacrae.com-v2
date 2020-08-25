import { useGithubJsonForm } from "react-tinacms-github";

export const ArticlesFormOptions = {
  label: 'Articles Archive',
  fields: [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' }
  ]
}

export const useArticlesForm = (file) => useGithubJsonForm(file, ArticlesFormOptions);