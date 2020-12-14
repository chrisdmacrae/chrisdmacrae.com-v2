import React from "react";
import { InlineTextarea } from "react-tinacms-inline";
import { useCMS } from "tinacms";

export const Paragraph = (props) => <p {...props}>{props.children}</p>;

export type EditableParagraphProps = {
  name: string
} & {
  [key: string]: any
}

export function EditableParagraph (props) {
  const cms = useCMS();
  const isEditing = cms.enabled;
  let children = props.children;
  
  if (isEditing) {
    children = <InlineTextarea name={props.name} />
  }
  
  return <Paragraph {...props}>{children}</Paragraph>;
}