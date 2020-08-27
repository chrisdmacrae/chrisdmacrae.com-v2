import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticlesRoute, useArticlesData } from '../../lib/articles/routes/articles';
import { footerRelativePath, useFooterData } from '../../lib/core/components/Footer';

export const ArticlesPage = ({ page, footer }) => (
 <ArticlesRoute page={page} footer={footer} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const fileRelativePath = './lib/articles/routes/articles/articles.json';
  let props = {
    isEditing: preview ?? false,
    page: {
      error: null,
      file: {
        fileRelativePath: fileRelativePath,
        data: (await useArticlesData()).default,
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
      fileRelativePath: fileRelativePath,
      parse: parseJson,
      head_branch: process.env.BASE_BRANCH
    });
    const footerProps = await getGithubPreviewProps({
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

export default ArticlesPage;