import { ChangeDetectorRef, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/app-config.interface';
import { APP_CONFIG } from 'src/app/config/app-config.module';
import { Role } from '../../models/identity/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  userData$!: Observable<UserDataResult>;
  registerUri!: string;
  display: boolean = false;

  menu_items!: MenuItem[];

  isUserMenuVisible: boolean = false;
  showMenuClicked: boolean = false;

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$.pipe(
      map((a) => a.isAuthenticated)
    );

    this.userData$ = this.oidcSecurityService.userData$.pipe(
      tap((u) => {
        this.menu_items = HeaderComponent.getMenuItems(
          u.userData?.role == Role.Administrator,
          u.userData?.role == Role.Moderator
        );

        this.cdref.detectChanges();
      })
    );
    this.registerUri = this.config.baseUrl + this.config.identityRegisterPath;
  }

  search(query: string) {
    this.router.navigate(['/search', query]);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.router.navigate(['/home']);
    this.oidcSecurityService.logoff();
  }

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  static getMenuItems(isAdmin: boolean, isModerator: boolean) {
    return [
      {
        label: 'Библиотека',
        icon: 'pi pi-book',
        routerLink: ['library'],
      },
      {
        label: 'Популярное',
        icon: 'pi pi-angle-double-up',
        routerLink: ['popular'],
      },
      {
        label: 'Авторы',
        icon: 'pi pi-users',
        routerLink: ['privacy'],
      },
      {
        label: 'Расширенный поиск',
        icon: 'pi pi-search-plus',
        routerLink: ['preferences'],
      },
      { label: 'Новости', icon: 'pi pi-globe' },
      { label: 'Частые вопросы', icon: 'pi pi-info-circle' },
      {
        label: 'Админ панель',
        icon: 'pi pi-chart-bar',
        routerLink: ['admin'],
        visible: isAdmin,
      },
      {
        label: 'Панель модератора',
        icon: 'pi pi-th-large',
        routerLink: ['moderator'],
        visible: isAdmin || isModerator,
      },
    ];
  }
}
