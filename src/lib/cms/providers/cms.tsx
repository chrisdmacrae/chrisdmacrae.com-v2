import React, { useMemo } from "react";
import { GithubClient, GithubMediaStore, TinacmsGithubProvider } from "react-tinacms-github";
import { TinaCMS, TinaProvider } from "tinacms";
import { ArticleContentCreator } from "../content-creators/article";
import { enterEditMode, exitEditMode } from "../utils/editMode";
import { GithubProvider } from "./github";

export interface CmsProviderProps {
  isEditing: boolean;
  error: Error,
  children: React.ReactElement;
}

export function CmsProvider({ isEditing, error, children }: CmsProviderProps) {
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

    cms.plugins.add(ArticleContentCreator);

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