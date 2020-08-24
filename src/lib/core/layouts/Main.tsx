import React from 'react';
import { ColorSchemeToggle } from '../components/ColorScheme/ColorSchemeToggle';
import { NavBar } from '../components/Navigation/NavBar';
import BaseLayout, { BaseLayoutProps } from './Base';

export interface MainLayoutProps extends BaseLayoutProps {}

export default function MainLayout({ page, children }: MainLayoutProps) {
  return (
    <>
      <NavBar>
        {{
          end: <ColorSchemeToggle />
        }}
      </NavBar>
      <BaseLayout page={page}>
        {children}
      </BaseLayout>
    </>
  )
}