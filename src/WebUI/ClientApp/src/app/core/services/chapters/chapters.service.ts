import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Summary } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Chapter } from '../../models/chapter/chapter';

@Injectable({
  providedIn: 'root',
})
export class ChaptersService {
  constructor(private httpClient: HttpClient) {}

  getChapter(
    summaryId: number,
    number: number,
    clearCache: boolean = false
  ): Observable<Chapter> {
    return this.httpClient
      .get<Chapter>(`api/chapters/${summaryId}/${number}`, {
        context: withCache({
          ttl: 600000,
          clearCachePredicate: () => clearCache,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  getChapters(
    summaryId: number,
    clearCache: boolean = false
  ): Observable<Chapter[]> {
    return this.httpClient
      .get<Chapter[]>(`api/chapters/${summaryId}`, {
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
