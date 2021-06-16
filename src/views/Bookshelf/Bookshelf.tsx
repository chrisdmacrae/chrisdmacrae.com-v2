import { Layout, Heading, Text, Box, Stack } from "cdm-ui";
import React from "react";
import { BasicLayout } from "../../layouts"
import { Book } from "./Book";

export type BookshelfProps = {
  books: Record<string, any>[]
}

export const Bookshelf: React.VFC<BookshelfProps> = ({
  books
}) => {
  return (
    <BasicLayout>
      <Layout.Item>
        <Box padding="sm">
          <Heading as="h1">My Bookshelf</Heading>
          <Text>The literature that has made me capable of all that I have and will do</Text>
        </Box>
      </Layout.Item>
      {books.map(book => (
        <Layout.Item span={0.02}>
          <Book {...book as any} />
        </Layout.Item>
      ))}
    </BasicLayout>
  )
}