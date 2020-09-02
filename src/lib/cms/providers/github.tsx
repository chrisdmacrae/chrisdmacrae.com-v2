import React from 'react';
import { useGithubToolbarPlugins } from 'react-tinacms-github';

export interface GithubToolbarProviderProps {
  children: React.ReactElement
}

export function GithubToolbarProvider({ children }: GithubToolbarProviderProps) {
  useGithubToolbarPlugins();

  return children;
}