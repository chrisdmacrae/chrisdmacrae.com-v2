import React, { ReactNode, useEffect } from 'react';
import { Box, Scale, Scales } from 'cdm-ui';
import styles from './Stack.module.css';

export type StackProps = {
  as?: keyof JSX.IntrinsicElements;
  direction?: 'horizontal' | 'vertical' | 'ltr' | 'rtl' | 'ttb' | 'btt';
  align?: 'start' | 'middle' | 'end';
  fill?: boolean;
  gap?: "apart" | "evenly" | "around" | Scales;
  position?: "start" | "middle" | "end";
  inline?: boolean;
  stretch?: boolean;
  children: ReactNode | ReactNode[];
  ref?: any;
}

export const Stack: React.FC<StackProps> = ({ 
  as = 'div',
  align = 'start',
  direction = 'ltr',
  fill = false,
  gap = 'apart',
  inline = false, 
  position = 'start',
  stretch = false,
  ref,
  children 
}) => {
  const Element = as;
  const classNames = [styles.Stack];
  const vars = {};

  useEffect(() => Array.isArray(children) ? checkChildrenSize(children) : checkChildrenSize([children]), [children]);

  if (direction === 'horizontal' || direction === "ltr") 
    vars['--stack-direction'] = 'row';
  if (direction === "rtl") vars['--stack-direction'] = 'row-reverse';
  if (direction === "btt") vars['--stack-direction'] = 'column-reverse';
  if (fill && direction === 'horizontal') vars['--stack-width'] = '100%';
  if (fill && direction === 'vertical') vars['--stack-height'] = '100%';
  if (stretch) classNames.push(styles.Stretch);
  if (inline) classNames.push(styles.InlineStack);
  if (gap === 'apart') classNames.push(styles.GapApart);
  if (gap === 'around') classNames.push(styles.GapAround);
  if (gap === 'evenly') classNames.push(styles.GapEvenly);
  if (gap === 'xs') vars['--stack-gap'] = Scale.xs;
  if (gap === 'sm') vars['--stack-gap'] = Scale.sm;
  if (gap === 'md') vars['--stack-gap'] = Scale.md;
  if (gap === 'lg') vars['--stack-gap'] = Scale.lg;
  if (gap === 'xl') vars['--stack-gap'] = Scale.xl;
  if (align === 'start') classNames.push(styles.AlignStart);
  if (align === 'middle') classNames.push(styles.AlignMiddle);
  if (align === 'end') classNames.push(styles.AlignEnd);
  if (position === 'start') classNames.push(styles.PositionStart);
  if (position === 'middle') classNames.push(styles.PositionMiddle);
  if (position === 'end') classNames.push(styles.PositionEnd);

  return (
    <Box 
      as={as}
      ref={ref}
      className={classNames.join(' ')}
      style={vars as React.CSSProperties}
    >
        {children}
    </Box>
  );
}

function checkChildrenSize(
  childArray: (React.ReactChild | React.ReactFragment | React.ReactPortal)[]
) {
  if (!Array.isArray(childArray)) return;
  
  const totalFlex = childArray?.reduce((flexCount: number, currentChild) => {
    const elementChild = currentChild as React.ReactElement<{size: number | { min: number, max: number }}>;

    if (elementChild?.props && elementChild?.props.size) {
      const size = elementChild.props.size;

      if (typeof size == 'number') {
        flexCount += size;
      } else if (size.max) {
        flexCount += size.max;
      }
    }
    else {
      flexCount += 1;
    }

    return flexCount;
  }, 0) as number;

  if (totalFlex > childArray.length) {
    console.warn(
      `The cumulative total of the children's sizes (${parseFloat(
        totalFlex.toFixed(3)
      )}) ` + `cannot exceed the amount of children (${childArray.length})`
    );
  }
}
