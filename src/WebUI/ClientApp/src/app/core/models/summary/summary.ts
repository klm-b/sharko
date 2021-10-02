import { ChapterInfo } from '../chapter/chapter-info';
import { Label } from '../label/label';

export interface Summary {
  id?: number;
  rating?: number;
  bookId: number;
  creator?: string;
  about?: string;
  createdAt?: Date;
  lastModified?: Date;
  labels?: Label[];
  chapters?: ChapterInfo[];
}
