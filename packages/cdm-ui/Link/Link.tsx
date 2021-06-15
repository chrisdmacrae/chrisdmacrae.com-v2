import NextLink from 'next/link';
import { BoxProps } from 'cdm-ui';
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
    <Box className={classNames.join(' ')}>
      <NextLink href={href} as={href} prefetch={true}>
        {children}
      </NextLink>
    </Box>
  )
}