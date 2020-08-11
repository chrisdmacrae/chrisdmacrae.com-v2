import BaseLayout, { BaseLayoutProps } from "./base";

export interface PopupLayout {
  children: React.ReactElement;
}

export interface PopupLayoutProps extends BaseLayoutProps { }

export function PopupLayout({ page, children }: PopupLayoutProps) {
  return (
    <BaseLayout page={page}>
      {children}
    </BaseLayout>    
  )
}