import { Box } from 'cdm-ui/Box';
import styles from './Text.module.css';

export type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  strong?: boolean;
  italic?: boolean;
  muted?: boolean;
}

export const Text: React.FC<TextProps> = ({ as = 'p', strong, italic, muted, children }) => {
  const classNames = [styles.Text];
  const vars = {} as React.CSSProperties;

  if (muted) vars['--text-color'] = 'rgba(0, 0, 0, 0.5)'

  return (
    <Box as={as} className={classNames.join(' ')} style={vars}>
      {children}
    </Box>
  )
}