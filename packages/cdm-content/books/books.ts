import { join } from 'path';
import {getAllContent, getContentPaths, getContentBySlug, BaseModel} from '../content';

export type BookModel = BaseModel & {
  title: string;
  description: string;
  href: string;
  src: string;
}

export const booksDirectory =  join(process.cwd(), 'packages/cdm-content/books/');
export const getBookPaths = () => getContentPaths(booksDirectory, ['.md']);
export const getBookBySlug = (slug: string, fields?: string[]) => getContentBySlug<BookModel>(slug, booksDirectory, '.md');
export const getAllBooks = (fields?: string[]) => getAllContent<BookModel>(booksDirectory, ['.md'], '', fields);