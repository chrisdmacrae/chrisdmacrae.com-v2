import { useGithubJsonForm } from "react-tinacms-github";

export const ArticlesFormOptions = {
  label: 'Articles Archive',
  fields: [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' },
    {
      name: 'image',
      component: 'image',
      parse: (image) => image,
      previewSrc: (formValues) => formValues.image,
      uploadDir: (formValues) => "src/public/uploads/"
    }
  ]
}

export const useArticlesForm = (file) => useGithubJsonForm(file, ArticlesFormOptions);