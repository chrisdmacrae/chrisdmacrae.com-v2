import React from "react";
import type { PostModel } from "cdm-content";
import { Box, Head, Heading, Layout, Link, Stack, Text } from "cdm-ui";
import { useBreakpoints } from "cdm-ui/Theme";
import { BasicLayout } from "../../layouts";
import styles from './Homepage.module.css';
import { Article } from "../Article";
import { Divider } from "cdm-ui/Divider";

export type HomepageProps = {
  posts: PostModel[]
}

export const Homepage: React.FC<HomepageProps> = ({ posts }) => {
  return (
    <BasicLayout className={styles.Homepage}>
      <Head title="Fullstack Designer" />
      <Layout.Item id="articles">
        <Box padding="sm" id="intro">
          <Heading as="h1" size="title">
            An <Text as="span" highlight>island man</Text> with too much time to <Link href="/bookshelf">read books</Link>, <Link href="/">drink posh coffee</Link>, and <Link href="/bookshelf">think hard about not thinking</Link>.
          </Heading>
          <Divider />
        </Box>
        <Stack direction="vertical" stretch>
          <Box padding="sm">
            <Heading as="h3">My thoughts</Heading>
          </Box>
          {posts?.map((post, i) => <Article {...post} i={posts.length - 1 - i} key={post.slug} />)}
        </Stack>
      </Layout.Item>
    </BasicLayout>
  );
}