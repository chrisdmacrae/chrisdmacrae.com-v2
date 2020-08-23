import React from 'react';
import { usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import MainLayout from '../../../core/layouts/Main';
import { useArticlesForm } from './articles.form';
import styles from "./articles.module.css";

export interface ArticlesProps {
  file: any;
  isEditing?: boolean;
  children?: React.ReactChild;
}

export function ArticlesRoute({ file }: ArticlesProps) {
  const [data, form] = useArticlesForm(file);
  const repo_path = [
    "https://github.com",
    process.env.REPO_FULL_NAME,
    "blob",
    process.env.BASE_BRANCH,
    "src",
    (file as GitFile).fileRelativePath
  ].join("/");
  const page = {
    title: data.title,
    description: data.description
  }

  usePlugin(form);

  return (
    <InlineForm form={form}>
      <MainLayout page={page}>
        TODO
      </MainLayout>
    </InlineForm>
  );
}

export default ArticlesRoute;