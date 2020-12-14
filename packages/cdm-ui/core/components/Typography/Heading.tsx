import React from "react";
import { InlineTextarea } from "react-tinacms-inline";
import { useCMS } from "tinacms";

export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  bold?: boolean;
  border?: boolean;
  className?: string;
  children: React.ReactChild
}

export function Heading({ as, bold, border, className, children }: HeadingProps) {
  const Tag = as ?? "h2";
  let classNames = [];

  if (bold) {
    classNames.push("font-weight-bold");
  }

  if (border) {
    classNames.push("spanborder")
  }

  if (className) {
    className.split(" ").forEach(className => classNames.push(className));
  }

  return (
    <Tag className={classNames.join(" ")}>
      <span>{children}</span>
    </Tag>
  );
}

export interface EditableHeadingProps extends HeadingProps {
  name: string
}

export function EditableHeading(props) {
  const cms = useCMS();
  const isEditing = cms.enabled;
  const { name, children } = props;

  if (isEditing) {
    return (
      <Heading {...props}>
        <InlineTextarea name={name} />
      </Heading>
    )
  }
  
  return <Heading {...props}>{children}</Heading>
}