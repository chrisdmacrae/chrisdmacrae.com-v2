import React from 'react';
import { ColorSchemeToggle } from '../components/ColorScheme/ColorSchemeToggle';
import { NavBar } from '../components/Navigation/NavBar';
import BaseLayout, { BaseLayoutProps } from './Base';

export interface MainLayoutProps extends BaseLayoutProps {}

export default function MainLayout({ seo, children }: MainLayoutProps) {
  return (
    <>
      <NavBar>
        {{
          middle: <ColorSchemeToggle />
        }}
      </NavBar>
      <BaseLayout seo={seo}>
        {children}
      </BaseLayout>
    </>
  )
}