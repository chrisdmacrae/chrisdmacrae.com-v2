import React from 'react';
import { useCMS } from 'tinacms';

export interface EditLinkProps {
  children: React.ReactChild
}

export const EditLink = ({ children }: EditLinkProps) => {
  const cms = useCMS();
  const isEditing = cms.enabled;
  let message: React.ReactChild = isEditing ? 'Exit edit mode' : 'Edit this site'

  if (children) {
    message = children;
  }

  return (
    <a href="#" onClick={() => cms.toggle()}>
      {message}
    </a>
  )
}