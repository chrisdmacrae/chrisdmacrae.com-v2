import React from "react";
import { PostModel } from "cdm-content"
import { Box, Heading, Link, Stack, Text, useBreakpoints } from "cdm-ui";

export type ArticleProps = PostModel & { i?: number };

export const Article: React.FC<ArticleProps> = ({
  title,
  description,
  created,
  updated,
  slug,
  i
}) => {
  const breakpoints = useBreakpoints();

  return (
    <Link href={slug}>
      <Box padding="sm" className='post'>
        <Stack align="start" direction={breakpoints.md ? 'horizontal' : 'vertical'}>
          <Text highlight>#{i + 1}</Text>
          <Stack.Item>
            <Heading as='h2'>{title}</Heading>
            <Text>{description}</Text>
            <Text size={breakpoints.md ? 'xs' : 'sm'} muted>
              Posted on {new Date(created).toLocaleDateString()} · 
              Last updated {new Date(updated).toLocaleDateString()}
            </Text>
          </Stack.Item>
        </Stack>
      </Box>
    </Link>
  )
}