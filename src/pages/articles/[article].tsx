import React from 'react';
import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticleRoute, useArticleData } from '../../lib/articles/routes/article';
import { getAllArticlePaths } from '../../lib/articles/routes/article';

export const ArticlePage = ({ file, isEditing }) => (
  <ArticleRoute file={file} isEditing={isEditing} />
)

export async function getStaticPaths() {
  const paths = await getAllArticlePaths();

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async function ({
  params,
  preview,
  previewData,
}) {
  const fileRelativePath = params.articleRelPath;
  let props = {
    sourceProvider: null,
    error: null,
    isEditing: preview ?? false,
    file: {
      fileRelativePath: fileRelativePath,
      data: (await useArticleData(params.articlePathFromContent as string)).default,
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

export default ArticlePage;