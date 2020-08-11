import React from 'react';
import { usePlugin } from 'tinacms';
import { useGithubJsonForm } from 'react-tinacms-github';
import MainLayout from '../lib/core/layouts/Main';
import { ArticleCallout } from '../lib/article/components/Callout';

export function Home({file, preview}) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' }
    ]
  }
  const [data, form] = useGithubJsonForm(file, formOptions)
  const page = {
    title: data.title ?? "",
    description: data.description
  }
  
  usePlugin(form)

  return (
    <MainLayout page={page}>
      <ArticleCallout />
      <h1>{data.title}</h1>
    </MainLayout>
  );
}

export const getStaticProps = (context) => {
  return {
    props: {
      preview: true,
      file: {
        fileRelativePath: "./src/content/home.json"
      }
    }
  }
}

export default Home
