import { useContext } from 'react';
import { HeadContext } from './HeadProvider';

export type HeadProps = {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  robots?: 'follow' | 'noindex' | 'nofollow' | string;
  // Todo: support date
  cache?: boolean | number;
}

export const Head: React.FC<HeadProps> = ({ author, cache, title, description, keywords, robots = 'follow' }) => {
  const context = useContext(HeadContext)
  const Wrapper = context.head;
  const seperator = ' - ';
  const getTitle = () => {
    if (!context.title) return title;
    if (typeof context.title === 'string') return [title, context.title].join(seperator);
    if (typeof context.title === 'object') {
      if (context.title.prefix && context.title.suffix) return [context.title.prefix, title, context.title.suffix].join(seperator);
      if (context.title.prefix) return [context.title.prefix, title].join(seperator);
      if (context.title.suffix) return [title, context.title.suffix].join(seperator)
    }
  }
  
  return (
    <Wrapper>
      <title>{getTitle()}</title>
      <meta name="description" content={description ?? context.description} />
      <meta charSet="utf-8" />
      <meta name="robots" content={robots} />
      {cache === false && <meta http-equiv="cache-control" content="no-cache"/>}
      {typeof cache === 'number' && <meta http-equiv="cache-control" content={cache.toString()} />}
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {author && (
        <>
          <meta name="author" content={author} />
          <meta name="copyright" content={author} />
        </>
      )}
    </Wrapper>
  )
}