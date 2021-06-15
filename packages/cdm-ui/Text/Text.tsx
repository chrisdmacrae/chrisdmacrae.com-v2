import { Box } from 'cdm-ui/Box';
import styles from './Text.module.css';

export type TextProps = {
  as?: keyof JSX.IntrinsicElements;
}

export const Text: React.FC<TextProps> = ({ as = 'p', children }) => {
  const classNames = [styles.Text];
  return (
    <Box as={as} className={classNames.join(' ')}>
      {children}
    </Box>
  )
}