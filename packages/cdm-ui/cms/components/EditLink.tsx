import React from 'react';
import { useCMS } from 'tinacms';

export interface EditLinkProps {
  children: React.ReactChild
}

export const EditLink = ({ children }: EditLinkProps) => {
  const cms = useCMS();
  const isEditing = cms.enabled;
  let message: React.ReactChild = isEditing ? 'Exit edit modedsafdsdasf' : 'Edit this site'

  if (children) {
    message = children;
  }

  return (
    <span onClick={isEditing ? cms.enable : cms.disable}>
      {message}
    </span>
  )
}