import React from 'react';
import { NavBar } from '../components/Navigation/NavBar';
import BaseLayout, { BaseLayoutProps } from './Base';

export interface MainLayoutProps extends BaseLayoutProps {}

export default function MainLayout({ page, children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      <BaseLayout page={page}>
        {children}
      </BaseLayout>
    </>
  )
}