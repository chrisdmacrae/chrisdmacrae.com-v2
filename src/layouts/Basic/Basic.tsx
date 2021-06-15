import React from 'react';
import { Box, Heading, Layout, Link, Stack, Text, useBreakpoints } from 'cdm-ui';
import styles from './Basic.module.css';

export type BasicLayoutProps = {
  className?: string;
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({ className = '', children }) => {
  const classNames = [styles.BasicLayout, ...className.split(' ')];
  const breakpoints = useBreakpoints();
  const vars = {
    ['--layout-heading-size']: breakpoints.md ? '1.33rem' : '1rem'
  } as React.CSSProperties;
  
  return (
    <main className={classNames.join(' ')} style={vars}>
      <Layout gutter={breakpoints.md ? 16 : 0}>
        <Layout.Item>
          <Box padding={16}>
            <Stack direction="horizontal" stretch>
              <Heading as="h1">
                <Link href="/">
                  CDM
                </Link>
              </Heading>
              <Stack.Item>
                <Stack position="end" align="end" gap="evenly" direction="horizontal" stretch fill inline>
                  <Link href="/bookshelf">Bookshelf</Link>
                </Stack>
              </Stack.Item>
            </Stack>
          </Box>
        </Layout.Item>
        {children}
        <Layout.Item id="footer">
          <Box padding={16}>
            <Text size="sm" muted>
              Copyright &copy; {new Date().getFullYear()}, all rights reserved by Chris D. Macrae.
            </Text>
          </Box>
        </Layout.Item>
      </Layout>
    </main>
  )
}