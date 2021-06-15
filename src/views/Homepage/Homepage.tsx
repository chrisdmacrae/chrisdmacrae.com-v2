import type { PostModel } from "cdm-content";
import { Layout, Link, Stack, Text } from "cdm-ui";
import { Heading } from "cdm-ui/Heading/Heading";
import { useBreakpoints } from "cdm-ui/Theme";
import styles from './Homepage.module.css';

export type HomepageProps = {
  posts: PostModel[]
}

export const Homepage: React.FC<HomepageProps> = ({ posts }) => {
  const breakpoints = useBreakpoints();

  return (
    <main className={styles.Layout}>
      <Layout gutter={16}>
        <Layout.Item>
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
        </Layout.Item>
        {posts?.map((post, i) => (
        <Layout.Item id="posts">
          <Text>#{i + 1}</Text>
          <Link href="https://example.com">
            <>
              <Heading as='h2'>{post.title}</Heading>
              <Text>{post.description}</Text>
            </>
          </Link>
        </Layout.Item>
        ))}
        <Layout.Item id="footer"></Layout.Item>
      </Layout>
    </main>
  );
}