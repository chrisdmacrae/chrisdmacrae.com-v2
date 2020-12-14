import { GetStaticPaths, GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { ArticleRoute, getArticleMetaBySlug, useArticleData } from 'cdm-ui';
import { getAllArticlePaths } from 'cdm-ui';
import { footerRelativePath, useFooterData } from 'cdm-ui';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getAllArticlePaths())
    .map(article => {
      return {
        params: {
          article: article.slug
        }
      }
    });

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async function ({
  params,
  preview,
  previewData,
}) {
  try {
    const slug = Array.isArray(params.article) ? params.article.join("/") : params.article;
    const editing = preview || process.env.USE_REMOTE as unknown as boolean;
    const fileMeta = await getArticleMetaBySlug(slug);
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

    if (!props.page.file || !props.footer.file) {
      throw new Error("Failed to load data");
    }

    return {
      props: props
    }
  }
  catch (error) {
    console.error(error);

    return {
      notFound: true
    }
  }
}

export default ArticleRoute;
