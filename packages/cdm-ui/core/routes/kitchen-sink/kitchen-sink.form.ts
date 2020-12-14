import { useGithubJsonForm } from "react-tinacms-github";

export const HomeFormOptions = {
  label: 'Kitchen sink',
  fields: [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' },
  ]
}

export const useKitchenSinkForm = (file) => useGithubJsonForm(file, HomeFormOptions);