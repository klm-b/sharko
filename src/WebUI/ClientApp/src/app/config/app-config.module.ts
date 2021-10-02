import { InjectionToken } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { appConfig } from './app-config.dev';
import { AppConfig } from './app-config.interface';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        clientId: appConfig.applicationName,
        triggerAuthorizationResultEvent: true,
        authority: appConfig.stsUri,
        redirectUrl: appConfig.baseUrl + '/home',
        postLogoutRedirectUri: appConfig.baseUrl + '/home',
        scope: 'openid profile offline_access Sharko.WebUIAPI',
        responseType: 'code',
        silentRenew: true,
        silentRenewUrl: appConfig.baseUrl + '/silent-renew.html',
        // useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 10,
        tokenRefreshInSeconds: 60,
        logLevel: LogLevel.Error,
        renewUserInfoAfterTokenRenew: true,
        secureRoutes: [appConfig.baseUrl + '/api/'],
      },
    }),
  ],
  exports: [AuthModule],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig,
    },
  ],
})
export class AppConfigModule {}
