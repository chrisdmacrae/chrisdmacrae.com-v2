import { GetStaticProps } from 'next';
import { getAllArticlePaths } from '../../lib/articles/routes/article';
import { articlesRelPath, ArticlesRoute, useArticlesData } from '../../lib/articles/routes/articles';
import { getGithubPreviewData } from '../../lib/cms/utils/getGithubPreviewProps';
import { footerRelativePath, useFooterData } from '../../lib/core/components/Footer';

export const ArticlesPage = (props) => (
 <ArticlesRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const articlePaths = await getAllArticlePaths(preview);
  let props = {
    isEditing: preview ?? false,
    page: {},
    articles: [],
    footer: {}
  }

  if (preview || process.env.USE_REMOTE) {
    const fileProps = await getGithubPreviewData(articlesRelPath, previewData);
    const articlesProps = await Promise.all(articlePaths.map(async (a) => {
      const article = await getGithubPreviewData(a.articleRelPath, previewData);

      return {
        slug: a.slug,
        ...article.props
      };
    }));
    const footerProps = await getGithubPreviewData(footerRelativePath, previewData);

    props = {
      ...props,
      page: fileProps.props,
      articles: articlesProps,
      footer: footerProps.props
    }
  }
  else {
    props = {
      ...props,
      page: {
        error: null,
        file: {
          fileRelativePath: articlesRelPath,
          data: (await useArticlesData()).default,
        }
      },
      articles: await Promise.all(articlePaths.map(async (a) => {
        let article;

        if (!preview && !process.env.USE_REMOTE) {
          article = {
            slug: a.slug,
            error: null,
            file: {
              fileRelativePath: a.articleRelPath,
              data: (await import(`../../lib/articles/content/articles/${a.fileName}`)).default
            }
          }
        }

        return article;
      })),
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

export default ArticlesPage;
