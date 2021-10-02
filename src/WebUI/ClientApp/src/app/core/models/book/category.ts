import { Tag } from './tag';

export interface Category {
  name?: string;
  icon?: string;
  key?: string;
  tags?: Tag[];
}
