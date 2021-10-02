import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfigModule, APP_CONFIG } from './config/app-config.module';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import localeRu from '@angular/common/locales/ru-UA';
import { registerLocaleData } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ApiUrlInterceptor } from './core/interceptors/api-url.interceptor';
import { BlockUIModule } from 'primeng/blockui';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    AppConfigModule,
    ToastModule,
    BlockUIModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
      deps: [APP_CONFIG],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
