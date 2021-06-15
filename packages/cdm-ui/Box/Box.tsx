import React from 'react';
import styles from './Box.module.css';

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  padding?: number | string;
  radius?: number | string;
  inline?: boolean;
  style?: React.CSSProperties;
} & {
  [key: string]: any;
}

export const Box: React.FC<BoxProps> = ({ 
  as = 'div',
  className = '',
  inline,
  padding,
  radius,
  style = {},
  children,
  ...props
}) => {
  const Element = as;
  const classNames = [styles.Box, ...className.split(' ')];
  const vars = {} as React.CSSProperties;

  if (padding) vars['--box-padding'] = typeof padding === 'number' ? `${padding}px` : padding;
  if (radius) vars['--box-radius'] = typeof radius === 'number' ? `${radius}px` : radius;
  if (inline) classNames.push(styles.InlineBox);

  return (
    <Element {...props} className={classNames.join(' ')} style={{ ...vars, ...style }}>
      {children}
    </Element>
  )
}