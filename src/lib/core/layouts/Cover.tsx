import React from 'react';
import { NavBar } from '../components/Navigation/NavBar';
import BaseLayout, { BaseLayoutProps } from './base';

type ReactSlots = {
  [key: string]: React.ReactChild
}

export interface CoverLayoutProps extends BaseLayoutProps {
  children: React.ReactChild | ReactSlots
}

export default function CoverLayout({ page, children }: CoverLayoutProps) {
  const c = children as ReactSlots;
  const d = c.default ? c.default : children as React.ReactChild;

  return (
    <>
      <BaseLayout page={page}>
        <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
          <div className="mb-auto">
            <NavBar />
          </div>
          <div className="inner cover">
            {c.cover ? c.cover : null}
          </div>
          <div className="mt-auto">
            {c.coverFooter ? c.coverFooter : null}
          </div>
        </div>
        {d}
      </BaseLayout>
    </>
  )
}