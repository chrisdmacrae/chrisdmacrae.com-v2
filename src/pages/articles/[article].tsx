import React from 'react';
import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticleRoute, getArticleMetaByName, useArticleData } from '../../lib/articles/routes/article';
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
  const fileMeta = await getArticleMetaByName(params.article as string);
  let props = {
    sourceProvider: null,
    error: null,
    isEditing: preview ?? false,
    file: {
      fileRelativePath: fileMeta.articleRelPath,
      data: (await useArticleData(fileMeta.fileName)),
    }
  }

  if (preview) {
    props = {
      ...props,
      ...await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: fileMeta.articleRelPath,
        parse: parseJson,
      })
    }
  }

  return {
    props: props
  }
}

export default ArticlePage;