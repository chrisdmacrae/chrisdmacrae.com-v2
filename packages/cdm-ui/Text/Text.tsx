import { Box } from 'cdm-ui/Box';
import styles from './Text.module.css';

export type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  strong?: boolean;
  italic?: boolean;
  muted?: boolean;
  highlight?: boolean;
}

export const Text: React.FC<TextProps> = ({ 
  as = 'p', 
  strong, 
  italic, 
  muted, 
  highlight, 
  size = 'sm',
  children 
}) => {
  const classNames = [styles.Text];
  const vars = {} as React.CSSProperties;

  if (size === 'xs') vars['--text-size'] = '0.66em';
  if (size === 'sm') vars['--text-size'] = '1em';
  if (size === 'md') vars['--text-size'] = '1.33em';
  if (size === 'lg') vars['--text-size'] = '1.77em';
  if (size === 'xl') vars['--text-size'] = '2.35em';
  if (muted) vars['--text-color'] = 'rgba(0, 0, 0, 0.5)';
  if (highlight) classNames.push(styles.Highlight);

  return (
    <Box as={as} className={classNames.join(' ')} style={vars}>
      {children}
    </Box>
  )
}