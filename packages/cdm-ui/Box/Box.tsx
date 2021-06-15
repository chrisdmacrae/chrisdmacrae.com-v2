import React from 'react';
import styles from './Box.module.css';

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  padding?: number | string;
  style?: React.CSSProperties;
  inline?: boolean;
} & {
  [key: string]: any;
}

export const Box: React.FC<BoxProps> = ({ 
  as = 'div',
  className = '',
  padding,
  style = {},
  children 
}) => {
  const Element = as;
  const classNames = [styles.Box, ...className.split(' ')];
  const vars = {} as React.CSSProperties;

  if (padding) vars['--box-padding'] = typeof padding === 'number' ? `${padding}px` : padding;

  return (
    <Element className={classNames.join(' ')} style={{ ...vars, ...style }}>
      {children}
    </Element>
  )
}