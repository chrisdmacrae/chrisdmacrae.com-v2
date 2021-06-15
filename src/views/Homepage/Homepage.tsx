import React from "react";
import type { PostModel } from "cdm-content";
import { Box, Layout, Link, Stack, Text } from "cdm-ui";
import { Heading } from "cdm-ui/Heading/Heading";
import { useBreakpoints } from "cdm-ui/Theme";
import { BasicLayout } from "../../layouts";
import styles from './Homepage.module.css';

export type HomepageProps = {
  posts: PostModel[]
}

export const Homepage: React.FC<HomepageProps> = ({ posts }) => {
  const breakpoints = useBreakpoints();

  return (
    <BasicLayout className={styles.Homepage}>
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
    </BasicLayout>
  );
}