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
  
  if (isEditing) {
    return <InlineTextarea name={props.name} />
  }
  
  return props.children;
}