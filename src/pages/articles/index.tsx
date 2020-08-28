import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { getAllArticlePaths } from '../../lib/articles/routes/article';
import { articlesRelPath, ArticlesRoute, useArticlesData } from '../../lib/articles/routes/articles';
import { footerRelativePath, useFooterData } from '../../lib/core/components/Footer';

export const ArticlesPage = ({ page, articles, footer }) => (
 <ArticlesRoute page={page} articles={articles} footer={footer} />
);

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
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


  for (let articlePath of await getAllArticlePaths()) {
    let article;

    if (!preview && !process.env.USE_REMOTE) {
      article = {
        slug: articlePath.params.article,
        error: null,
        file: {
          fileRelativePath: articlePath.params.articleRelPath,
          data: (await import(`../../lib/articles/content/articles/${articlePath.params.article}.json`)).default
        }
      }
    }
    else {
      article = {}
    }

    props.articles.push(article);
  }

  if (preview || process.env.USE_REMOTE) {
    const fileProps = await getGithubPreviewProps({
      working_repo_full_name: process.env.REPO_FULL_NAME,
      github_access_token: process.env.GITHUB_ACCESS_TOKEN,
      ...previewData,
      fileRelativePath: articlesRelPath,
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

  return {
    props: props
  }
}

export default ArticlesPage;