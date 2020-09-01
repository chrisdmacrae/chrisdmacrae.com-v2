import React, { useEffect } from 'react';
import { GithubClient, GithubMediaStore, useGithubToolbarPlugins } from 'react-tinacms-github';
import { useCMS } from 'tinacms';

export interface GithubProviderProps {
  children: React.ReactElement
}

export function GithubProvider({ children }: GithubProviderProps) {
  const cms = useCMS();

  useEffect(() => {
    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME,
      baseBranch: process.env.BASE_BRANCH
    });
    const githubMediaStore = new GithubMediaStore(github);

    cms.registerApi('github', github);

    cms.media.store = githubMediaStore;
  });

  useGithubToolbarPlugins();
  
  return children;
}