import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/app-config.interface';
import { APP_CONFIG } from 'src/app/config/app-config.module';
import { User } from '../../models/user/user';
import { HttpCacheManager, withCache } from '@ngneat/cashew';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserActivity } from '../../models/user/user-activity';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private httpClient: HttpClient,
    public oidcSecurityService: OidcSecurityService
  ) {}

  getUser(
    username: string,
    clearCache: boolean = false
  ): Observable<User | null> {
    return this.httpClient
      .get<User>(`api/users/${username}`, {
        context: withCache({
          clearCachePredicate: () => clearCache,
        }),
      })
      .pipe(catchError((e) => of(null)));
  }

  getUserActivity(username: string): Observable<UserActivity | null> {
    return this.httpClient
      .get<UserActivity>(`api/users/${username}/activity`, {
        context: withCache({ ttl: 600000 }),
      })
      .pipe(catchError((e) => of(null)));
  }

  checkAvailability(username: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(`api/users/availability/${username}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
