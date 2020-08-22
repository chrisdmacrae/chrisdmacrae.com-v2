import React from 'react';
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import HomeRoute from '../lib/core/routes/home/home';

export const HomePage = ({ file, isEditing }) => (
  <HomeRoute file={file} isEditing={isEditing} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  let props = {
    sourceProvider: null,
    error: null,
    isEditing: false,
    file: {
      fileRelativePath: 'content/home.json',
      data: (await import('../content/home.json')).default,
    }
  }

  if (Boolean(process.env.IS_PRODUCTION) === false) {
    props = Object.assign(props, {
      isEditing: true
    });
  }

  if (preview) {
    props = {
      ...props,
      ...await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'content/home.json',
        parse: parseJson,
      })
    }
  }

  return {
    props: props
  }
}

export default HomePage;