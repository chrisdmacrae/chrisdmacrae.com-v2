import React from 'react';
import styles from './Layout.module.css';
import stackStyles from '../Stack/Stack.module.css';
import { Scale, Scales } from 'cdm-ui/Theme';
const {
  AlignStart,
  AlignMiddle,
  AlignEnd,
  PositionStart,
  PositionMiddle,
  PositionEnd
} = stackStyles;

export type LayoutProps = {
  gutter?: boolean | Scales;
  align?: 'start' | 'middle' | 'end';
  flow?: 'horizontal' | 'vertical';
  position?: "start" | "middle" | "end";
  wrap?: 'start' | 'end',
  fill?: boolean;
  size?: number;
}

export const Layout: React.FC<LayoutProps> = ({ 
  align = 'middle',
  gutter = true,
  fill = false,
  flow = 'horizontal',
  position = 'middle',
  size,
  wrap = 'end',
  children 
}) => {
  const classNames = [styles.Layout];
  const vars = {};

  if (typeof size === 'number' && flow === 'horizontal') 
    vars['--layout-width'] = `${size}px`;
  if (typeof size === 'number' && flow === 'vertical') 
    vars['--layout-height'] = `${size}px`;
    if (gutter === 'xs') vars['--layout-gutter'] = Scale.xs;
    if (gutter === 'sm') vars['--layout-gutter'] = Scale.sm;
    if (gutter === 'md') vars['--layout-gutter'] = Scale.md;
    if (gutter === 'lg') vars['--layout-gutter'] = Scale.lg;
    if (gutter === 'xl') vars['--layout-gutter'] = Scale.xl;
  if (gutter === false) vars['--layout-gap'] = 'space-between';
  if (gutter === true) vars['--layout-gap'] = 'space-around';
  if (flow === 'horizontal') vars['--layout-direction'] = 'row';
  if (wrap === 'start') vars['--layout-wrap'] = 'wrap-reverse';
  if (fill) classNames.push(styles.Fill);
  if (align === 'start') classNames.push(AlignStart);
  if (align === 'middle') classNames.push(AlignMiddle);
  if (align === 'end') classNames.push(AlignEnd);
  if (position === 'start') classNames.push(PositionStart);
  if (position === 'middle') classNames.push(PositionMiddle);
  if (position === 'end') classNames.push(PositionEnd);
  
  return (
    <div 
      className={classNames.join(' ')}
      style={vars as React.CSSProperties}
    >
        {children}
    </div>
  );
}
