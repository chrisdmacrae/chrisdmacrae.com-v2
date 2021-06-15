import { ReactNode } from 'react';
import styles from './Stack.module.css';

export type StackItemProps = {
  align?: 'start' | 'middle' | 'end';
  as?: keyof JSX.IntrinsicElements | ReactNode;
  order?: number;
}

export const StackItem: React.FC<StackItemProps> = ({
  as = 'div',
  align = 'start',
  order,
  children
}) => {
  const Element = as;
  const classNames = [styles.StackItem];
  const vars = {} as React.CSSProperties;

  if (align === 'start') classNames.push(styles.AlignStart);
  if (align === 'middle') classNames.push(styles.AlignMiddle);
  if (align === 'end') classNames.push(styles.AlignEnd);
  if (order) vars['--stack-order'] = order;

  return (
    <Element className={classNames.join(' ')} style={vars}>
      {children}
    </Element>
  )
}