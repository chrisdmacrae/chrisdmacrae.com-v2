import { Layout, Heading, Text, Box } from "cdm-ui";
import React from "react";
import { BasicLayout } from "../../layouts"

export type BookshelfProps = {
  books: Record<string, any>[]
}

export const Bookshelf: React.VFC<BookshelfProps> = ({
  books
}) => {
  return (
    <BasicLayout>
      <Layout.Item>
        <Box padding={16}>
          <Heading as="h1">My Bookshelf</Heading>
          <Text>The literature that has made me capable of all that I have and will do</Text>
        </Box>
      </Layout.Item>
      {books.map(book => (
        <Layout.Item span={0.02}>
          <Box padding={16}>
            <img src={book.src} width="180px" height="auto" />
            <Heading as="h3">{book.title}</Heading>
            <Text muted>{book.description}</Text>
            <Text size="xs" muted>{book.author}</Text>
          </Box>
        </Layout.Item>
      ))}
    </BasicLayout>
  )
}