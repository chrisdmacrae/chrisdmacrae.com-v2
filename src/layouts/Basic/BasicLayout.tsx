import React from 'react';
import { Box, Heading, Layout, Link, Stack, Text, useBreakpoints } from 'cdm-ui';
import styles from './Basic.module.css';
import { useCMS } from '@chrisdmacrae/teditor';

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
        <Layout.Item id="header">
          <Box padding="sm">
            <Stack direction="horizontal" stretch>
              <Heading as="h1">
                <Link href="/">
                  CDM
                </Link>
              </Heading>
              <Stack.Item align="middle" style={{ textAlign: 'right' }}>
                <Stack align="end" gap="evenly" direction="horizontal" inline>
                  <Link href="/bookshelf">Bookshelf</Link>
                </Stack>
              </Stack.Item>
            </Stack>
          </Box>
        </Layout.Item>
        {children}
        <Layout.Item id="footer">
          <Box padding={16}>
            <Stack direction="horizontal">
              <Stack.Item align="middle">
                <Text size="xs" muted>
                  &copy; {new Date().getFullYear()} Chris D. Macrae. All rights reserved.
                </Text>
              </Stack.Item>
              <Stack.Item align="middle" style={{ textAlign: 'right' }}>
                <Stack gap="sm" direction="rtl">
                  <Text as="span" size="sm" muted>
                    <Link href="#">
                      {/* <a onClick={() => cms.toggle()}>
                        {cms.enabled ? 'Finish editing' : 'Edit this page'}
                      </a> */}
                    </Link>
                  </Text>
                  <Text as="span" size="sm" muted>
                    <Link href="/bookshelf">Bookshelf</Link>
                  </Text>
                </Stack>
              </Stack.Item>
            </Stack>
          </Box>
        </Layout.Item>
      </Layout>
    </main>
  )
}