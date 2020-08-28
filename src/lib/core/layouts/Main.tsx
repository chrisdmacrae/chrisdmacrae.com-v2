import React, { useContext } from 'react';
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';
import { ColorSchemeToggle } from '../components/ColorScheme/ColorSchemeToggle';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/Navigation/NavBar';
import AppStateContext from '../state/app';
import { createGithubLink } from '../utils/createGithubLink';
import BaseLayout, { BaseLayoutProps } from './Base';

export interface MainLayoutProps extends BaseLayoutProps {
  page: any;
  footer: any;
}

export default function MainLayout({ page, footer, seo, children }: MainLayoutProps) {
  const repo_path = createGithubLink((page.file as GitFile).fileRelativePath);
  const { colorScheme } = useContext(AppStateContext);

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
      <footer className="p-3">
        <hr style={{ borderColor: colorScheme === "dark" ? "var(--gray-dark)" : "var(--lightblue)" }} />
        <Footer file={footer.file} repoPath={repo_path} />
      </footer>
    </>
  )
}