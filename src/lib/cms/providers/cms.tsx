import React, { useMemo } from "react";
import { GithubClient, TinacmsGithubProvider, useGithubToolbarPlugins } from "react-tinacms-github";
import { TinaCMS, TinaProvider } from "tinacms";
import { enterEditMode, exitEditMode } from "../utils/editMode";
import { GithubProvider } from "./github";

export interface CmsProviderProps {
  isEditing: boolean;
  error: Error,
  children: React.ReactElement;
}

export function CmsProvider({isEditing, error, children}: CmsProviderProps) {
  const cms = useMemo(() => {
    const cms = new TinaCMS({
      enabled: isEditing,
      sidebar: {
        hidden: !isEditing
      },
      toolbar: {
        hidden: !isEditing
      }
    });

    cms.registerApi('github', new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
    }));

    return cms;
  }, [isEditing]);

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        editMode={isEditing}
        enterEditMode={enterEditMode}
        exitEditMode={exitEditMode}
        error={error}
      >
        <GithubProvider>
          {children}
        </GithubProvider>
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}