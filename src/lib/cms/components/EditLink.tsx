import React from 'react';
import { useGithubEditing } from "react-tinacms-github"
import { useCMS } from 'tinacms';

export interface EditLinkProps {
  children: React.ReactChild
}

export const EditLink = ({ children }: EditLinkProps) => {
  const cms = useCMS();
  const isEditing = cms.enabled;
  const github = useGithubEditing();
  const defaultMessage = children !== "undefined" && isEditing ? ('Exit edit mode') : ('Edit this site')

  console.log(children);

  return (
    <span onClick={isEditing ? github.exitEditMode : github.enterEditMode}>
      {defaultMessage ?? children}
    </span>
  )
}