import React, { useState, useEffect } from "react";
import remark from "remark";
import guide from 'remark-preset-lint-markdown-style-guide';
import html from 'remark-html';
import { BlocksControls } from "react-tinacms-inline";
import { useCMS } from "tinacms";
import { InlineWysiwyg } from "react-tinacms-editor";

export interface RichTextBlockProps {
  index: number;
  data: {
    content: string;
  }
}

export function RichTextBlock({ index, data }: RichTextBlockProps) {
  const cms = useCMS();
  const [content, setContent] = useState<string>();
  
  useEffect(() => {
    import('react-tinacms-editor')
      .then(({MarkdownFieldPlugin}) => cms.plugins.add(MarkdownFieldPlugin));
  }, []);

  useEffect(() => {
    remark()
      .use(guide)
      .use(html)
      .process(data.content, (err, file) => {
        if (err) console.error(err);
        if (file) setContent(file.contents as string);
      });
  }, [data.content]);

  return (
    <BlocksControls index={index}>
      <InlineWysiwyg name="content" format="markdown">
        <div dangerouslySetInnerHTML={{__html: content ?? "<p></p>"}} />
      </InlineWysiwyg>
    </BlocksControls>
  )
}

export const RichTextBlockTemplate = {
  label: 'Content',
  key: 'content-block',
  defaultItem: {
    content: '',
  },
  fields: [{ name: 'content', label: 'Content', component: 'markdown' }],
}

export default {
  Component: RichTextBlock,
  template: RichTextBlockTemplate
}