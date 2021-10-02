import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Injectable()
export class IsProfileOwnerGuard implements CanActivate {
  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let canActivate =
      route.parent?.params?.username ===
      this.oidcSecurityService.getUserData()?.name;

    if (!canActivate) {
      this.router.navigate([
        route.pathFromRoot
          .map((v) =>
            v == route ? '' : v.url.map((s) => s.toString()).join('/')
          )
          .join('/'),
      ]);
    }
    return canActivate;
  }
}
