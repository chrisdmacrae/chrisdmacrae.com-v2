import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticlesRoute, useArticlesData } from '../../lib/articles/routes/articles';

export const ArticlesPage = ({ file }) => (
 <ArticlesRoute file={file} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const fileRelativePath = './lib/articles/routes/articles/articles.json';
  let props = {
    sourceProvider: null,
    error: null,
    isEditing: preview ?? false,
    file: {
      fileRelativePath: fileRelativePath,
      data: (await useArticlesData()).default,
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

export default ArticlesPage;