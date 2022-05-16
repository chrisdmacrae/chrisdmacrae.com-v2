import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import footnotes from "remark-gfm";
import { Box, Heading, Image, Stack, useBreakpoints } from "cdm-ui";
import { Text } from "cdm-ui/Text";
import { Link } from "cdm-ui/Link";
import styles from './LongFormText.module.css';
import { Divider } from "cdm-ui/Divider";

export type LongFormTextProps = {
  markdown: string;
};

export const LongFormText: React.VFC<LongFormTextProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
      className={styles.LongFormText}
      remarkPlugins={[gfm as any, footnotes as any]}
      components={{
        h1: (props) => (
          <LongFormContentLayout>
            <Heading {...props} as="h2" />
          </LongFormContentLayout>
        ),
        h2: (props) => (
          <LongFormContentLayout>
            <Heading {...props} as="h2" />
          </LongFormContentLayout>
        ),
        h3: (props) => (
          <LongFormContentLayout>
            <Heading {...props} as="h3" />
          </LongFormContentLayout>
        ),
        h4: (props) => (
          <LongFormContentLayout>
            <Heading {...props} as="h4" />
          </LongFormContentLayout>
        ),
        h5: (props) => (
          <LongFormContentLayout>
            <Heading {...props} as="h5" />
          </LongFormContentLayout>
        ),
        h6: (props) => (
          <LongFormContentLayout>
            <Heading {...props} as="h6" />
          </LongFormContentLayout>
        ),
        p: (props) => (
          <LongFormContentLayout>
            <Text as="p" {...props} />
          </LongFormContentLayout>
        ),
        ul: (props) => (
          <LongFormContentLayout>
            <Stack {...props} as="ul" gap="sm" direction="vertical" />
          </LongFormContentLayout>
        ),
        ol: (props) => (
          <LongFormContentLayout>
            <Stack {...props} as="ol" gap="sm" direction="vertical" />
          </LongFormContentLayout>
        ),
        a: (props) => (
          <Link {...props as any}>
            <a {...props} />
          </Link>
        ),
        img: (props) => (
          <LongFormImage src={props.src} alt={props.alt} {...props} />
        ),
        strong: (props) => <Text as="strong" highlight {...props} />,
        em: (props) => <Text as="em" italic {...props} />,
        hr: (props) => (
          <LongFormContentLayout>
            <Divider />
          </LongFormContentLayout>
        )
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

const LongFormImage = ({ src, alt, ...props }) => {
  const breakpoints = useBreakpoints();

  return (
    <Box size={{ min: 0, max: breakpoints.lg ? 1200 : "100%" }}>
      <Image {...props} src={src} alt={alt} layout='responsive' />
    </Box>
  );
};

const LongFormContentLayout: React.FC = ({ children }) => {
  return (
    <Box size={{ min: 0, max: 700 }} align="left" className={styles.LongFormLayout}>
      {children}
    </Box>
  );
};