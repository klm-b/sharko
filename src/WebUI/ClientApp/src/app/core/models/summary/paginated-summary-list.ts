import { SummaryInfo } from './summary-info';

export interface PaginatedSummaryList {
  items: SummaryInfo[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
