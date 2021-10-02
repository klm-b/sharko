import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AddSummary } from '../../models/summary/add-summary';
import { PaginatedSummaryList } from '../../models/summary/paginated-summary-list';
import { Summary } from '../../models/summary/summary';

@Injectable({
  providedIn: 'root',
})
export class SummariesService {
  constructor(private httpClient: HttpClient) {}

  getSummary(id: number, clearCache: boolean = false): Observable<Summary> {
    return this.httpClient
      .get<Summary>(`api/summaries/${id}`, {
        context: withCache({
          ttl: 600000,
          clearCachePredicate: () => clearCache,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  addSummary(summary: AddSummary): Observable<number> {
    return this.httpClient
      .post<number>(`api/summaries/`, summary)
      .pipe(catchError(this.handleError));
  }

  getSummaries(
    sortBy?: string,
    sortOrder?: string,
    pageNumber: number = 1,
    pageSize: number = 5,
    userName?: string,
    clearCache: boolean = false
  ): Observable<PaginatedSummaryList> {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    if (userName) params = params.append('userName', userName);
    if (sortBy) params = params.append('sortBy', sortBy);
    if (sortOrder) params = params.append('sortOrder', sortOrder);

    return this.httpClient
      .get<PaginatedSummaryList>(`api/summaries/`, {
        params: params,
        context: withCache({
          ttl: 600000,
          clearCachePredicate: () => clearCache,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
