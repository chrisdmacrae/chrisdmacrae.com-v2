import React from 'react';
import { useForm, usePlugin } from 'tinacms';
import { useGithubJsonForm } from 'react-tinacms-github';
import MainLayout from '../lib/core/layouts/Main';
import { ArticleCallout } from '../lib/article/components/Callout';
import { Container } from 'react-bootstrap';

export function Home({file, preview}) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'description', component: 'text' },
      { name: 'body', component: 'textarea' }
    ],
    initialValues: {
      title: "Mundana is an HTML Bootstrap Template for Professional Blogging",
      description: "Hello world, this site is alive!",
      body: "Beautifully crafted with the latest technologies, SASS & Bootstrap 4.1.3, Mundana is the perfect design for your professional blog. Homepage, post article and category layouts available."
    }
  }
  const [data, form] = useForm(formOptions);
  const page = {
    title: data.title,
    description: data.description
  }
  
  usePlugin(form)

  return (
    <MainLayout page={page}>
      <ArticleCallout
        title={data.title}
        body={data.body}
      />
      <Container>
        <p>{data.description}</p>
      </Container>
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
