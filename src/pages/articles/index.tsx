import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticlesRoute, useArticlesData } from '../../lib/articles/routes/articles';

export const ArticleArchivePage = ({ file }) => (
 <ArticlesRoute file={file} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const fileRelativePath = './lib/core/routes/home/home.json';
  let props = {
    sourceProvider: null,
    error: null,
    isEditing: false,
    file: {
      fileRelativePath: fileRelativePath,
      data: await (await useArticlesData()).default,
    }
  }

  if (Boolean(process.env.IS_PRODUCTION) === false) {
    props = Object.assign(props, {
      isEditing: true
    });
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

export default ArticleArchivePage;