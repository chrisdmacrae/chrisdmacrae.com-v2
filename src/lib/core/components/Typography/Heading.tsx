export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  bold?: boolean;
  border?: boolean;
  children: React.ReactChild
}

export function Heading({ as, bold, border, children }: HeadingProps) {
  const Tag = as ?? "h2";
  let classNames = [];

  if (bold) {
    classNames.push("font-weight-bold");
  }

  if (border) {
    classNames.push("spanborder")
  }

  return (
    <Tag className={classNames.join(" ")}>
      <span>{children}</span>
    </Tag>
  );
}