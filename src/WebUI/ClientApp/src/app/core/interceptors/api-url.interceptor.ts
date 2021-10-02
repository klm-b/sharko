import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app/config/app-config.module';
import { AppConfig } from 'src/app/config/app-config.interface';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  private static isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.prepareUrl(req.url) });
    return next.handle(req);
  }

  private prepareUrl(url: string): string {
    url = ApiUrlInterceptor.isAbsoluteUrl(url)
      ? url
      : this.config.apiBaseUrl + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
