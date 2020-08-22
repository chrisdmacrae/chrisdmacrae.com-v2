import { useGithubJsonForm } from "react-tinacms-github";

export const HomeFormOptions = {
  label: 'Home Page',
  fields: [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' },
    {
      name: 'cover', component: 'group', fields: [
        {
          name: 'subline', component: 'group', fields: [
            { name: 'morning', component: 'text' },
            { name: 'afternoon', component: 'text' },
            { name: 'evening', component: 'text' }
          ]
        },
        { name: 'headline', component: 'text' },
        { name: 'body', component: 'textarea' },
        {
          name: 'ctas', component: 'group-list', fields: [
            { name: 'type', component: 'select', options: ['button', 'link'] },
            { name: 'text', component: 'text' },
            { name: 'href', component: 'text' }
          ]
        }
      ]
    }
  ]
}

export const useHomeForm = (file) => useGithubJsonForm(file, HomeFormOptions);