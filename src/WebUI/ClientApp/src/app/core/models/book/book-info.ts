import { AuthorInfo } from '../author/author-info';

export interface BookInfo {
  id: number;
  name?: string;
  image?: string;
  tags?: string[];
  authors?: AuthorInfo[];
}
