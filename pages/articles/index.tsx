import { GetStaticProps } from 'next';
import { getAllArticlePaths, articlesRelPath, ArticlesRoute, useArticlesData, getGithubPreviewData, footerRelativePath, useFooterData } from 'cdm-ui';

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const editing = preview || process.env.USE_REMOTE as unknown as boolean;
  const articlePaths = await getAllArticlePaths(
    editing,
    previewData?.head_branch,
    previewData?.github_access_token
  );
  let props = {
    isEditing: preview || false,
    page: {},
    articles: [],
    footer: {}
  }

  if (editing) {
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
          data: (await useArticlesData()),
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
              data: (await import(`../../${a.articleRelPath}`)).default
            }
          }
        }

        return article;
      })),
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

export default ArticlesRoute;
