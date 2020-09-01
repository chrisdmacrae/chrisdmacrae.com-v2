import React, { useMemo } from "react";
import { GithubClient, GithubMediaStore, TinacmsGithubProvider } from "react-tinacms-github";
import { TinaCMS, TinaProvider } from "tinacms";
import { ArticleContentCreator } from "../content-creators/article";
import { enterEditMode, exitEditMode } from "../utils/editMode";
import { GithubProvider, GithubToolbarProvider } from "./github";

export interface CmsProviderProps {
  isEditing: boolean;
  error: Error,
  children: React.ReactElement;
}

export function CmsProvider({ isEditing, error, children }: CmsProviderProps) {
  const cms = useMemo(() => {
    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME,
      baseBranch: process.env.BASE_BRANCH
    });
    const githubMediaStore = new GithubMediaStore(github);
    const cms = new TinaCMS({
      enabled: isEditing,
      sidebar: {
        hidden: !isEditing
      },
      toolbar: {
        hidden: !isEditing
      },
      media: {
        store: githubMediaStore
      }
    });

    cms.registerApi('github', github);
    cms.plugins.add(ArticleContentCreator);

    return cms;
  }, []);

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        editMode={isEditing}
        enterEditMode={enterEditMode}
        exitEditMode={exitEditMode}
      >
        <GithubToolbarProvider>
          {children}
        </GithubToolbarProvider>
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}