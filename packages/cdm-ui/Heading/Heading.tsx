import React from 'react';
import { Box } from '../Box';
import styles from './Heading.module.css';

export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'title' | 'strapline' | 'headline'
  muted?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  as = 'h1',
  muted,
  size,
  children
}) => {
  const classNames = [styles.Heading];
  const vars = {} as React.CSSProperties;

  if (as) classNames.push(styles[as]);
  if (muted) vars['--heading-color'] = 'rgba(0, 0, 0, 0.75)';
  if (size) classNames.push(styles[size]);

  return (
    <Box as={as} className={classNames.join(' ')} style={vars}>
      {children}
    </Box>
  )
}