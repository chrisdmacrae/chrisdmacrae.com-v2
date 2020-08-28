import React from 'react';
import { ColorSchemeToggle } from '../components/ColorScheme/ColorSchemeToggle';
import { NavBar } from '../components/Navigation/NavBar';
import BaseLayout, { BaseLayoutProps } from './Base';

type ReactSlots = {
  [key: string]: React.ReactChild
}

export interface CoverLayoutProps extends BaseLayoutProps {
  children: React.ReactChild | ReactSlots
}

export default function CoverLayout({ seo, children }: CoverLayoutProps) {
  const c = children as ReactSlots;
  const d = c.default ? c.default : children as React.ReactChild;

  return (
    <BaseLayout seo={seo}>
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <div className="mb-auto">
        <NavBar>
        {{
          middle: <ColorSchemeToggle />
        }}
      </NavBar>
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
  )
}