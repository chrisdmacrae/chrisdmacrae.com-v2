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

  if (preview || process.env.USE_REMOTE) {
    const fileProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      ...previewData,
      fileRelativePath: homeRelativePath,
      parse: parseJson,
      head_branch: process.env.BASE_BRANCH
    });
    const footerProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      ...previewData,
      fileRelativePath: footerRelativePath,
      parse: parseJson,
      head_branch: process.env.BASE_BRANCH
    });

    props = {
      ...props,
      page: fileProps.props,
      footer: footerProps.props
    }
  }

  return {
    props: props
  }
}

export default HomePage;