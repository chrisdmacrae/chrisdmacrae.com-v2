import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticleRoute, getArticleMetaByName, useArticleData } from 'cdm-ui';
import { getAllArticlePaths } from 'cdm-ui';
import { footerRelativePath, useFooterData } from 'cdm-ui';

export const ArticlePage = (props) => {
  const route = useRouter();

  if (route.isFallback) {
    return <>Loading...</>
  }
  
  return (
    <ArticleRoute {...props} />
  );
}

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
  const editing = preview || process.env.USE_REMOTE as unknown as boolean;
  const fileMeta = await getArticleMetaByName(params.article as string);
  let props = {
    isEditing: preview ?? false,
    page: {} as any,
    footer: {} as any
  }

  if (editing) {
    const fileProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      fileRelativePath: fileMeta.articleRelPath,
      head_branch: process.env.BASE_BRANCH,
      ...previewData,
      parse: parseJson
    });
    const footerProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      head_branch: process.env.BASE_BRANCH,
      fileRelativePath: footerRelativePath,
      ...previewData,
      parse: parseJson,
    });

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
          sha: null,
          fileRelativePath: fileMeta.articleRelPath,
          data: (await useArticleData(fileMeta.articleRelPath)),
        }
      },
      footer: {
        error: null,
        file: {
          sha: null,
          fileRelativePath: footerRelativePath,
          data: (await useFooterData())
        }
      }
    }
  }

  return {
    props: props,
    unstable_revalidate: 60
  }
}

export default ArticlePage;
