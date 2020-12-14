import { default as NextHead} from 'next/head';

export * from 'next/head';

export interface HeadProps {
  title: string;
  description: string;
  children: React.ReactElement | React.ReactElement[];
}

export function Head({ title, description, children }: HeadProps)
{
    return (
      <NextHead>
        <title key="title">{computeTitle(title)}</title>
        <meta name="description" content={description} key="description"></meta> 
        {children}
      </NextHead>
    )
}

const computeTitle = (title: string) => title?.indexOf("chrisdmacrae.com") === -1
    ? `${title} - chrisdmacrae.com`
    : title ?? "chrisdmacrae.com";

export default Head;