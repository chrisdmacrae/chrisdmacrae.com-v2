import NextLink from 'next/link';
import { Box } from 'cdm-ui/Box';
import styles from './Link.module.css';

export type LinkProps = {
  href: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children
}) => {
  const classNames = [styles.Link];

  if (href.startsWith('http')) {
    return (
      <Box as='a' href={href} className={classNames.join(' ')}>
        {children}
      </Box>
    )
  }

  return (
    <Box as="span" className={classNames.join(' ')}>
      <NextLink href={href}>
        {children}
      </NextLink>
    </Box>
  )
}