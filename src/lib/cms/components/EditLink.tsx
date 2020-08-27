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
  let message: React.ReactChild = isEditing ? 'Exit edit modedsafdsdasf' : 'Edit this site'

  if (children) {
    message = children;
  }

  return (
    <span onClick={isEditing ? github.exitEditMode : github.enterEditMode}>
      {message}
    </span>
  )
}