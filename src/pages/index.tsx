import { GetStaticProps } from 'next'
import Head from 'next/head'
import { usePlugin } from 'tinacms'
import { InlineForm, InlineField, InlineText } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { Grid, Layout, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

export const getStaticProps: GetStaticProps = async ({preview, previewData}) => {
  if (preview) 
  {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'src/content/home.json',
      parse: parseJson,
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'src/content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}

export function Home({file, preview}) {
  const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  }
  const [data, form] = useGithubJsonForm(file, formOptions)
  
  usePlugin(form)
  useGithubToolbarPlugins();

  return preview
    ? (    
      <InlineForm form={form}>
        <Title>
          <InlineText name="title" />
        </Title>
        <Paragraph>
          <InlineText name="title" />
        </Paragraph>
      </InlineForm>
    )
    : (
      <>
        <Title>{data.title}</Title>
        <Paragraph>{data.description}</Paragraph>
      </>
    )
}

export default Home
