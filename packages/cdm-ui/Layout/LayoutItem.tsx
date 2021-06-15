import React from "react";
import styles from './Layout.module.css';
import stackStyles from '../Stack/Stack.module.css';
const {
  AlignSelfStart,
  AlignSelfMiddle,
  AlignSelfEnd
} = stackStyles;

export type LayoutItemProps = {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  align?: "start" | "middle" | "end"
  oneHalf?: boolean;
  oneThird?: boolean;
  twoThirds?: boolean;
  oneFourth?: boolean;
  twoFourths?: boolean;
  threeFourths?: boolean;
  oneFifth?: boolean;
  twoFifths?: boolean;
  threeFifths?: boolean;
  fourFifths?: boolean;
  span?: number;
}

export const LayoutItem: React.FC<LayoutItemProps> = ({ as = 'div', align, id, span, children, ...props }) => {
  const Element = as;
  const classNames = [styles.LayoutItem];
  const vars = {};

  if (align === 'start') classNames.push(AlignSelfStart);
  if (align === 'middle') classNames.push(AlignSelfMiddle);
  if (align === 'end') classNames.push(AlignSelfEnd);
  if (props.oneHalf) classNames.push(styles.LayoutOneHalf);
  if (props.oneThird) classNames.push(styles.LayoutOneThird);
  if (props.twoThirds) classNames.push(styles.LayoutTwoThirds);
  if (props.oneFourth) classNames.push(styles.LayoutOneFourth);
  if (props.twoFourths) classNames.push(styles.LayoutTwoFourths);
  if (props.threeFourths) classNames.push(styles.LayoutThreeFourths);
  if (props.oneFifth) classNames.push(styles.LayoutOneFifth);
  if (props.twoFifths) classNames.push(styles.LayoutTwoFifths);
  if (props.threeFifths) classNames.push(styles.LayoutThreeFifths);
  if (props.fourFifths) classNames.push(styles.LayoutFourFifths);
  if (span) vars['--layout-item-width'] = `${span}%`;

  return (
    <Element 
      className={classNames.join(' ')}
      style={vars as React.CSSProperties}
      id={id}
    >
        {children}
    </Element>
  );
}