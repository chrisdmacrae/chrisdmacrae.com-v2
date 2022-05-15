import {unified} from 'unified'
import remark from 'remark-parse'
import rehypeRemark from 'rehype-remark'
import autoHeadings from 'rehype-autolink-headings'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remark)
    .use(rehypeRemark)
    .use(autoHeadings)
    .process(markdown)
  
  return result.toString()
}