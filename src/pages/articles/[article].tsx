import React from 'react';
import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticleRoute, getArticleMetaByName, useArticleData } from '../../lib/articles/routes/article';
import { getAllArticlePaths } from '../../lib/articles/routes/article';
import { footerRelativePath, useFooterData } from '../../lib/core/components/Footer';

export const ArticlePage = ({ page, footer }) => (
  <ArticleRoute page={page} footer={footer} />
)

export async function getStaticPaths() {
  const paths = (await getAllArticlePaths())
    .map(article => ({
      params: {
        article: article.slug
      }
    }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async function ({
  params,
  preview,
  previewData,
}) {
  const fileMeta = await getArticleMetaByName(params.article as string);
  let props = {
    isEditing: preview ?? false,
    page: {
      error: null,
      file: {
        fileRelativePath: fileMeta.articleRelPath,
        data: (await useArticleData(fileMeta.articleRelPath)),
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
      fileRelativePath: fileMeta.articleRelPath,
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

  console.log({ props });

  return {
    props: props
  }
}

export default ArticlePage;
