import { BookInfo } from '../book/book-info';

export interface Author {
  id?: number;
  name?: string;
  biography?: string;
  image?: string;
  books?: BookInfo[];
}
