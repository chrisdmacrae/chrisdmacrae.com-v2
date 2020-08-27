import React from 'react';
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { HomeRoute, useHomeData } from '../lib/core/routes/home';
import { footerRelativePath, useFooterData } from '../lib/core/components/Footer';

export const HomePage = (props) => (
  <HomeRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const fileRelativePath = './lib/core/routes/home/home.json';
  let props = {
    isEditing: preview ?? false,
    page: {
      error: null,
      file: {
        fileRelativePath: fileRelativePath,
        data: (await useHomeData()).default,
      }
    },
    footer: {
      error: null,
      file: {
        fileRelativePath: footerRelativePath,
        data: (await useFooterData()).default
      }
    }
  }

  if (preview) {
    const fileProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: fileRelativePath,
      parse: parseJson,
    });
    const footerProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: footerRelativePath,
      parse: parseJson,
    });

    props = {
      ...props,
      ...fileProps.props,
      page: fileProps.props,
      footer: footerProps.props
    }
  }

  return {
    props: props
  }
}

export default HomePage;