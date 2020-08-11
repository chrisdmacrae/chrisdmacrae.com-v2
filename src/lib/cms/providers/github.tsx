import React from 'react';
import { useGithubToolbarPlugins } from 'react-tinacms-github';

export interface GithubProviderProps {
  children: React.ReactElement
}

export function GithubProvider({ children }: GithubProviderProps) {
  useGithubToolbarPlugins();
  
  return children;
}