import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { getAllArticlePaths } from '../../lib/articles/routes/article';
import {  articlesRelPath, ArticlesRoute, useArticlesData } from '../../lib/articles/routes/articles';
import { footerRelativePath, useFooterData } from '../../lib/core/components/Footer';

export const ArticlesPage = (props) => (
 <ArticlesRoute {...props} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const articlePaths = await getAllArticlePaths();
  let props = {
    isEditing: preview ?? false,
    page: {
      error: null,
      file: {
        fileRelativePath: articlesRelPath,
        data: (await useArticlesData()).default,
      }
    },
    articles: [],
    footer: {
      error: null,
      file: {
        fileRelativePath: footerRelativePath,
        data: (await useFooterData()).default
      }
    }
  }

  for (let a of articlePaths) {
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

      props.articles.push(article);
    }
  }

  if (preview || process.env.USE_REMOTE) {
    const getGithubPreviewPropsUtil = async (fileRelativePath) => {
      return await getGithubPreviewProps({
        working_repo_full_name: process.env.REPO_FULL_NAME,
        github_access_token: process.env.GITHUB_ACCESS_TOKEN,
        ...previewData,
        fileRelativePath: fileRelativePath,
        parse: parseJson,
        head_branch: process.env.BASE_BRANCH
      });      
    }
    const fileProps = await getGithubPreviewPropsUtil(articlesRelPath);
    const articlesProps = await Promise.all(articlePaths.map(async (a) => {
      const article = await getGithubPreviewPropsUtil(a.articleRelPath);

      return article.props;
    }));
    const footerProps = await getGithubPreviewPropsUtil(footerRelativePath);

    props = {
      ...props,
      page: fileProps.props,
      articles: articlesProps,
      footer: footerProps.props
    }
  }

  return {
    props: props
  }
}

export default ArticlesPage;
