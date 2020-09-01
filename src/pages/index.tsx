import React from 'react';
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { homeRelativePath, HomeRoute, useHomeData } from '../lib/core/routes/home';
import { footerRelativePath, useFooterData } from '../lib/core/components/Footer';
import { getGithubPreviewData } from '../lib/cms/utils/getGithubPreviewProps';

export const HomePage = (props) => (
  <HomeRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  let props = {
    isEditing: preview ?? false,
    page: {},
    footer: {}
  }

  if (preview || process.env.USE_REMOTE) {
    const fileProps = await getGithubPreviewData(homeRelativePath, previewData);
    const footerProps = await getGithubPreviewData(footerRelativePath, previewData);
    props = {
      ...props,
      page: fileProps.props,
      footer: footerProps.props
    }
  }
  else {
    props = {
      ...props,
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
  }

  return {
    props: props
  }
}

export default HomePage;