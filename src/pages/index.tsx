import React from 'react';
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { homeRelativePath, HomeRoute, useHomeData } from '../lib/core/routes/home';
import { footerRelativePath, useFooterData } from '../lib/core/components/Footer';

export const HomePage = (props) => (
  <HomeRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  let props = {
    isEditing: preview ?? false,
    page: {
      error: null,
      file: {
        fileRelativePath: homeRelativePath,
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
      fileRelativePath: homeRelativePath,
      parse: parseJson
    });
    const footerProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: footerRelativePath,
      parse: parseJson
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