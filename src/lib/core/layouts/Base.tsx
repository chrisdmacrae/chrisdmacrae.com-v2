import React from 'react';
import { Head } from '../../seo/components/head/head';

export interface BaseLayoutProps {
  page: {
    title: string;
    description: string;
  }
  children: any
}

export default function BaseLayout({ page, children }: BaseLayoutProps) {
  return (
    <>
      <Head title={page.title} description={page.description}>
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />
      </Head>
      {children}
    </>
  )
}