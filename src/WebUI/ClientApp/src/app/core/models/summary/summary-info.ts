import { BookInfo } from '../book/book-info';
import { Label } from '../label/label';

export interface SummaryInfo {
  id: number;
  rating?: number;
  chaptersNumber?: number;
  creator?: string;
  about?: string;
  createdAt?: Date;
  lastModified?: Date;
  labels?: Label[];

  bookId: number;
  book?: BookInfo;
}
