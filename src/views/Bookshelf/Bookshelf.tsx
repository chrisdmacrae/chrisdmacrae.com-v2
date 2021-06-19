import { Layout, Heading, Text, Box, Stack, useBreakpoints, Divider } from "cdm-ui";
import React from "react";
import { BasicLayout } from "../../layouts"
import { Book } from "./Book";

export type BookshelfProps = {
  books: Record<string, any>[]
}

export const Bookshelf: React.VFC<BookshelfProps> = ({
  books
}) => {
  const breakpoints = useBreakpoints();

  return (
    <BasicLayout>
      <Layout.Item>
        <Box padding="sm">
          <Heading as="h1" size="headline">My Bookshelf</Heading>
          <Text>The literature that has made me capable of all that I have and will do</Text>
          <Divider />
        </Box>
      </Layout.Item>
      {books.map(book => (
        <Layout.Item align="start" span={breakpoints.sm ? 0.02 : 0.5} key={book.title}>
          <Book {...book as any} />
        </Layout.Item>
      ))}
    </BasicLayout>
  )
}