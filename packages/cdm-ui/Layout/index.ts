export * from './Layout';
export * from './LayoutItem';
import { Layout as LayoutComponent } from './Layout';
import { LayoutItem } from './LayoutItem';

export const Layout = LayoutComponent as typeof LayoutComponent & { Item: typeof LayoutItem };
Layout.Item = LayoutItem;