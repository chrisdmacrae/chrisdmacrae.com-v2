import { Scale, Scales } from 'cdm-ui/Theme/types';
import React from 'react';
import styles from './Box.module.css';

export type BoxProps = {
  align?: "left" | "center" | "right";
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  padding?: number | Scales | {
    top?: number | Scales;
    right?: number | Scales;
    bottom?: number | Scales;
    left?: number | Scales;
    x?: number | Scales;
    y?: number | Scales;
  };
  radius?: number | string;
  size?: number | string | { min: number | string, max: number | string }
  inline?: boolean;
  fill?: boolean;
  style?: React.CSSProperties;
} & {
  [key: string]: any;
}

export const Box: React.FC<BoxProps> = ({ 
  align,
  as = 'div',
  className = '',
  inline,
  padding,
  radius,
  size,
  fill,
  style = {},
  children,
  ...props
}) => {
  const Element = as;
  const classNames = [styles.Box, ...className.split(' ')];
  const vars = {} as React.CSSProperties;

  if (align === "left") classNames.push(styles.AlignLeft);
  if (align === "center") classNames.push(styles.AlignCenter);
  if (align === "right") classNames.push(styles.AlignRight);
  if (typeof padding !== 'object') vars['--box-padding'] = typeof padding === 'number' ? `${padding}px` : padding;
  if (padding === 'xs') vars['--box-padding'] = Scale.xs;
  if (padding === 'sm') vars['--box-padding'] = Scale.sm;
  if (padding === 'md') vars['--box-padding'] = Scale.md;
  if (padding === 'lg') vars['--box-padding'] = Scale.lg;
  if (padding === 'xl') vars['--box-padding'] = Scale.xl;
  if (typeof padding === 'object' && padding.x === 'xs') vars['--box-padding-horizontal'] = Scale.xs;
  if (typeof padding === 'object' && padding.x === 'sm') vars['--box-padding-horizontal'] = Scale.sm;
  if (typeof padding === 'object' && padding.x === 'md') vars['--box-padding-horizontal'] = Scale.md;
  if (typeof padding === 'object' && padding.x === 'lg') vars['--box-padding-horizontal'] = Scale.lg;
  if (typeof padding === 'object' && padding.x === 'xl') vars['--box-padding-horizontal'] = Scale.xl;
  if (typeof padding === 'object' && padding.y === 'xs') vars['--box-padding-vertical'] = Scale.xs;
  if (typeof padding === 'object' && padding.y === 'sm') vars['--box-padding-vertical'] = Scale.sm;
  if (typeof padding === 'object' && padding.y === 'md') vars['--box-padding-vertical'] = Scale.md;
  if (typeof padding === 'object' && padding.y === 'lg') vars['--box-padding-vertical'] = Scale.lg;
  if (typeof padding === 'object' && padding.y === 'xl') vars['--box-padding-vertical'] = Scale.xl;
  if (radius) vars['--box-radius'] = typeof radius === 'number' ? `${radius}px` : radius;
  if (fill) vars['width'] = '100%';
  if (inline) classNames.push(styles.InlineBox);
  if (typeof size === 'string') vars['width'] = size;
  if (typeof size === 'number') vars['width'] = `${size}px`; 
  if (typeof size === 'object') vars['minWidth'] = typeof size.min === 'number' ? `${size.min}px` : size.min;
  if (typeof size === 'object') vars['maxWidth'] = typeof size.max === 'number' ? `${size.max}px` : size.max;

  return (
    <Element {...props} className={classNames.join(' ')} style={{ ...vars, ...style }}>
      {children}
    </Element>
  )
}