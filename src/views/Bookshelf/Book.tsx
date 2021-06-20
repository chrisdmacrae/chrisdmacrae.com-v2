import React from "react"
import { Box, Heading, Image, Layout, Link, Text } from "cdm-ui"

export type BookProps = {
  href: string;
  src: string;
  title: string;
  description: string;
  author: string;
}

export const Book: React.FC<BookProps> = ({
  href,
  src,
  title,
  description,
  author
}) => {
  return (
    <Link href={href}>
      <Box padding="sm">
        <Image src={src} width={180} height={250} layout="fixed" />
        <Box padding={{ y: 'sm' }}>
          <Heading as="h3">{title}</Heading>
          <Text muted>{description}</Text>
          <Text size="xs" muted>{author}</Text>
        </Box>
      </Box>
    </Link>
  )
}