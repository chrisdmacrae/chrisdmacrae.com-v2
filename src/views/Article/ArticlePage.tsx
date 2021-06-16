import React from "react";
import {
  Box,
  Divider,
  Heading,
  Layout,
  Link,
  LongFormText,
  Stack,
  Text,
  useBreakpoints,
} from "cdm-ui";
import { PostModel } from "cdm-content";
import { BasicLayout } from "../../layouts";
import styles from "./Article.module.css";

export type ArticlePageProps = {
  post: PostModel;
  next?: PostModel;
  prev?: PostModel;
};

export const ArticlePage: React.FC<ArticlePageProps> = ({
  post,
  next,
  prev,
}) => {
  const breakpoints = useBreakpoints();

  return (
    <BasicLayout className={styles.Article}>
      <Layout.Item align="start" oneFourth>
        <Box padding="sm">
          <Text as="span" size={breakpoints.md ? "md" : "sm"}>
            <Link href="/">← All articles</Link>
          </Text>
        </Box>
      </Layout.Item>
      <Layout.Item threeFourths id="post" as="article">
        <Box padding="sm">
          <Heading as="h1" size="headline">
            {post.title}
          </Heading>
          <Stack gap="md" direction="vertical">
            <Box size={{ min: 0, max: 700 }}>
              <Heading as="h3">
                <Text underline>{post.description}</Text>
              </Heading>
            </Box>
            <Stack gap="sm" direction="horizontal" align="middle">
              <Box
                title="Chris D. Macrae"
                padding="md"
                radius="100%"
                style={{
                  backgroundImage: "url(/uploads/photo_chris.png)",
                  backgroundSize: "cover",
                }}
                inline
              />
              <Stack gap="xs" direction="vertical">
                <Text as="strong" size="sm" highlight>
                  Chris D. Macrae
                </Text>
                <Text as="span" size="sm" muted>
                  Posted on {new Date(post.created).toLocaleDateString()} · Last
                  updated {new Date(post.updated).toLocaleDateString()}
                </Text>
              </Stack>
            </Stack>
            <Divider />
            <Stack.Item>
              <LongFormText markdown={post.rawContent} />
            </Stack.Item>
            {(next || prev) && <Divider />}
            <Stack gap="apart" direction="horizontal" fill>
                {next?.slug && (
                  <Link href={next.slug}>
                    <a>
                      <Stack direction="vertical">
                        <Heading as="h3">Up Next</Heading>
                        <Text as="a">{next.title}</Text>
                      </Stack>
                    </a>
                  </Link>
                )}
                {prev?.slug && (
                  <Link href={prev.slug}>
                    <a>
                      <Stack direction="vertical">
                        <Heading as="h3">Published Earlier</Heading>
                        <Text as="a">{prev.title}</Text>
                      </Stack>
                    </a>
                  </Link>
                )}
            </Stack>
          </Stack>
        </Box>
      </Layout.Item>
    </BasicLayout>
  );
};
