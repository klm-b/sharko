import { BookInfo } from './book-info';

export interface PaginatedBookList {
  items: BookInfo[];
  pageIndex?: number;
  totalPages?: number;
  totalCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
