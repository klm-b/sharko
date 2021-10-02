import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Label } from '../../models/label/label';

@Injectable({
  providedIn: 'root',
})
export class LabelsService {
  constructor(private httpClient: HttpClient) {}

  getLabels(clearCache: boolean = false): Observable<Label[]> {
    return this.httpClient
      .get<Label[]>(`api/labels`, {
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
