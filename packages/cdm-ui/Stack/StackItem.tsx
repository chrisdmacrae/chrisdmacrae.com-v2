import React, { ReactNode } from 'react';
import styles from './Stack.module.css';

export type StackItemProps = {
  align?: 'start' | 'middle' | 'end';
  as?: keyof JSX.IntrinsicElements | ReactNode;
  order?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const StackItem: React.FC<StackItemProps> = ({
  as = 'div',
  align = 'start',
  order,
  className = '',
  children,
  style = {}
}) => {
  const Element: any = as;
  const classNames = [styles.StackItem, ...className.split(' ')];
  const vars = {} as React.CSSProperties;

  if (align === 'start') classNames.push(styles.AlignStart);
  if (align === 'middle') classNames.push(styles.AlignMiddle);
  if (align === 'end') classNames.push(styles.AlignEnd);
  if (order) vars['--stack-order'] = order;

  return (
    <Element className={classNames.join(' ')} style={{ ...vars, ...style }}>
      {children}
    </Element>
  )
}