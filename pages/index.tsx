import React from 'react';
import { GetStaticProps } from 'next'
import { homeRelativePath, HomeRoute, useHomeData } from 'cdm-ui';
import { footerRelativePath, useFooterData } from 'cdm-ui';
import { getGithubPreviewData } from 'cdm-ui';

export const HomePage = (props) => (
  <HomeRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const editing = preview || process.env.USE_REMOTE as unknown as boolean;
  let props = {
    isEditing: preview ?? false,
    page: {},
    footer: {}
  }

  if (editing) {
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
          data: (await useHomeData()),
        }
      },
      footer: {
        error: null,
        file: {
          fileRelativePath: footerRelativePath,
          data: (await useFooterData())
        }
      }
    }
  }

  return {
    props: props
  }
}

export default HomePage;