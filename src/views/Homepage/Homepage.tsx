import type { PostModel } from "cdm-content";
import { Box, Layout, Link, Stack, Text } from "cdm-ui";
import { Heading } from "cdm-ui/Heading/Heading";
import { useBreakpoints } from "cdm-ui/Theme";
import React from "react";
import styles from './Homepage.module.css';

export type HomepageProps = {
  posts: PostModel[]
}

export const Homepage: React.FC<HomepageProps> = ({ posts }) => {
  const breakpoints = useBreakpoints();
  const vars = {
    ['--layout-heading-size']: breakpoints.md ? '1.33rem' : '1rem'
  } as React.CSSProperties;

  return (
    <main className={styles.Layout} style={vars}>
      <Layout gutter={breakpoints.md ? 16 : 0}>
        <Layout.Item>
          <Box padding={16}>
            <Stack direction="horizontal">
              <Stack.Item as="h1">CDM</Stack.Item>
              <Stack.Item>
                <Stack direction="horizontal">
                  <a href="#">Item</a>
                  <a href="#">Item</a>
                  <a href="#">Item</a>
                  <a href="#">Item</a>
                </Stack>
              </Stack.Item>
            </Stack>
          </Box>
        </Layout.Item>
        <Layout.Item id="posts">
          <Stack stretch>
            {posts?.map((post, i) => (
              <Box padding={16} className='post'>
                <Link href="https://example.com">
                  <Stack align="start" direction={breakpoints.md ? 'horizontal' : 'vertical'}>
                    <Text highlight>#{i + 1}</Text>
                    <Stack.Item>
                      <Heading as='h2'>{post.title}</Heading>
                      <Text>{post.description}</Text>
                      <Text size={breakpoints.md ? 'xs' : 'sm'} muted>
                        Posted on {new Date(post.created).toLocaleDateString()} · 
                        Last updated {new Date(post.updated).toLocaleDateString()}
                      </Text>
                    </Stack.Item>
                  </Stack>
                </Link>
              </Box>
            ))}
          </Stack>
        </Layout.Item>
        <Layout.Item id="footer">
          <Box padding={16}>
            <Text muted>Copyright &copy; {new Date().getFullYear()}, all rights reserved by Chris D. Macrae.</Text>
          </Box>
        </Layout.Item>
      </Layout>
    </main>
  );
}