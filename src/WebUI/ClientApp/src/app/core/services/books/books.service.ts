import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../../models/book/book';
import { PaginatedBookList } from '../../models/book/paginated-book-list';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  getBooks(
    pageNumber: number,
    pageSize: number = 10,
    category?: string,
    clearCache: boolean = false
  ): Observable<PaginatedBookList> {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return this.httpClient
      .get<PaginatedBookList>(
        `api/books/category/${category ? category : 'all'}`,
        {
          params: params,
          context: withCache({
            ttl: 600000,
            clearCachePredicate: () => clearCache,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getBooksByTitle(
    title: string,
    pageNumber: number,
    pageSize: number = 10,
    clearCache: boolean = false
  ): Observable<PaginatedBookList> {
    let params = new HttpParams();

    params = params.append('title', title);
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return this.httpClient
      .get<PaginatedBookList>('api/books', {
        params: params,
        context: withCache({
          ttl: 600000,
          clearCachePredicate: () => clearCache,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  getBook(id: number, clearCache: boolean = false): Observable<Book> {
    return this.httpClient
      .get<Book>(`api/books/${id}`, {
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
