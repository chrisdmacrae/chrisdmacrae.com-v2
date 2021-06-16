import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Box, Heading, useBreakpoints } from "cdm-ui";
import { Text } from "cdm-ui/Text";

export type LongFormTextProps = {
  markdown: string;
};

export const LongFormText: React.VFC<LongFormTextProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
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
        img: (props) => (
          <LongFormImage src={props.src} alt={props.alt} {...props} />
        ),
        strong: (props) => <Text as="strong" highlight {...props} />,
        em: (props) => <Text as="em" italic {...props} />,
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

const LongFormImage = ({ src, alt, ...props }) => {
  const breakpoints = useBreakpoints();

  return (
    <Box
      size={{ min: 0, max: breakpoints.lg ? 1200 : "100%" }}
      style={{ position: "relative", paddingBottom: "56.25%" }}
    >
      <Image {...props} src={src} alt={alt} layout="fill" />
    </Box>
  );
};

const LongFormContentLayout: React.FC = ({ children }) => {
  return (
    <Box size={{ min: 0, max: 700 }} align="left">
      {children}
    </Box>
  );
};