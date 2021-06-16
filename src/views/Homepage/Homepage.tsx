import React from "react";
import type { PostModel } from "cdm-content";
import { Box, Heading, Layout, Link, Stack, Text } from "cdm-ui";
import { useBreakpoints } from "cdm-ui/Theme";
import { BasicLayout } from "../../layouts";
import styles from './Homepage.module.css';
import { Article } from "../Article";
import { Divider } from "cdm-ui/Divider";

export type HomepageProps = {
  posts: PostModel[]
}

export const Homepage: React.FC<HomepageProps> = ({ posts }) => {
  const breakpoints = useBreakpoints();

  return (
    <BasicLayout className={styles.Homepage}>
      <Layout.Item id="articles">
        <Box padding="sm" id="intro">
          <Heading as="h1" size="title">
            An <Text as="span" highlight>island man</Text> with too much time to <Link href="/bookshelf">read books</Link>, <Link href="/">drink posh coffee</Link>, and <Link href="/bookshelf">think hard about not thinking</Link>.
          </Heading>
          <Divider />
        </Box>
        <Stack stretch>
          <Box padding="sm">
            <Heading as="h3">My thoughts</Heading>
          </Box>
          {posts?.map((post, i) => <Article {...post} i={i} />)}
        </Stack>
      </Layout.Item>
    </BasicLayout>
  );
}