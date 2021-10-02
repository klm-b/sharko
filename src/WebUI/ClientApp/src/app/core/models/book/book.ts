import { AuthorInfo } from '../author/author-info';
import { Summary } from '../summary/summary';
import { SummaryInfo } from '../summary/summary-info';

export interface Book {
  id?: number;
  name?: string;
  rating?: number;
  image?: string;
  about?: string;
  tags?: string[];
  categories?: string[];
  isbns?: string[];
  authors?: AuthorInfo[];
  summaries?: SummaryInfo[];
}
