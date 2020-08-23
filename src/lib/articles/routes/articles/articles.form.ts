import { useGithubJsonForm } from "react-tinacms-github";

export const HomeFormOptions = {
  label: 'Home Page',
  fields: [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' }
  ]
}

export const useArticlesForm = (file) => useGithubJsonForm(file, HomeFormOptions);