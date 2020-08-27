import React from 'react';
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import { ColorSchemeToggle } from '../components/ColorScheme/ColorSchemeToggle';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/Navigation/NavBar';
import { createGithubLink } from '../utils/createGithubLink';
import BaseLayout, { BaseLayoutProps } from './Base';

export interface MainLayoutProps extends BaseLayoutProps {
  page: any;
  footer: any;
}

export default function MainLayout({ page, footer, seo, children }: MainLayoutProps) {
  const repo_path = createGithubLink((page.file as GitFile).fileRelativePath);

  return (
    <>
      <NavBar>
        {{
          middle: <ColorSchemeToggle />
        }}
      </NavBar>
      <BaseLayout seo={seo}>
        {children}
      </BaseLayout>
      <Footer file={footer.file} repoPath={repo_path} />
    </>
  )
}