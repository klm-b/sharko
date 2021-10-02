import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../models/book/category';
import { PaginatedBookList } from '../../models/book/paginated-book-list';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories(
    withTags: boolean = false,
    clearCache: boolean = false
  ): Observable<Category[]> {
    let query = withTags ? `api/categories/tags` : `api/categories`;

    return this.httpClient
      .get<Category[]>(query, {
        context: withCache({
          clearCachePredicate: () => clearCache,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
