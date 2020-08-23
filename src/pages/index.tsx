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
    isEditing: preview ?? false,
    file: {
      fileRelativePath: fileRelativePath,
      data: (await import('../lib/core/routes/home/home.json')).default,
    }
  }

  if (preview) {
    props = {
      ...props,
      ...await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: fileRelativePath,
        parse: parseJson,
      })
    }
  }

  return {
    props: props
  }
}

const fileRelativePath = 'src/lib/core/routes/home/home.json';

export default HomePage;