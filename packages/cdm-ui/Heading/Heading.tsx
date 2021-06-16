import React from 'react';
import { Box } from '../Box';
import styles from './Heading.module.css';

export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'title' | 'strapline' | 'headline'
}

export const Heading: React.FC<HeadingProps> = ({
  as = 'h1',
  size,
  children
}) => {
  const classNames = [styles.Heading];

  if (as) classNames.push(styles[as]);
  if (size) classNames.push(styles[size]);

  return (
    <Box as={as} className={classNames.join(' ')}>
      {children}
    </Box>
  )
}