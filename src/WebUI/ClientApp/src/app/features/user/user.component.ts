import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/models/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ProfileComponent } from './profile/profile.component';
import { UserActivity } from 'src/app/core/models/user/user-activity';
import { SummariesComponent } from './summaries/summaries.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    public oidcSecurityService: OidcSecurityService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  userData$!: Observable<UserDataResult>;
  user$!: Observable<User | null>;
  userActivity$!: Observable<UserActivity | null>;
  username!: string;

  items!: MenuItem[];

  activeItem!: MenuItem;

  isProfileOwner: boolean = false;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.username = params.get('username') ?? '';

      this.isProfileOwner =
        this.username === this.oidcSecurityService.getUserData()?.name;

      this.userData$ = this.oidcSecurityService.userData$;

      this.items = UserComponent.getMenuItems(this.isProfileOwner);

      this.user$ = this.usersService.getUser(this.username).pipe(
        tap((u) => {
          if (!u) this.router.navigate(['/404']);
        })
      );
      this.userActivity$ = this.usersService.getUserActivity(this.username);
    });
  }

  onOutletLoaded(component: ProfileComponent | SummariesComponent) {
    component.username = this.username;

    if (component instanceof ProfileComponent && window.history.state?.data)
      component.clearCache = window.history.state?.data?.clearCache;
  }

  static getMenuItems(isProfileOwner: boolean) {
    return [
      {
        label: 'Главная',
        icon: 'pi pi-fw pi-home',
        routerLink: ['./'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Конспекты',
        icon: 'pi pi-fw pi-file',
        routerLink: ['summaries'],
      },
      {
        label: 'Сборники',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['collections'],
      },
      {
        label: 'Награды',
        icon: 'pi pi-fw pi-sun',
        routerLink: ['awards'],
      },
      {
        label: 'Комментарии',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['comments'],
        visible: isProfileOwner,
      },
      {
        label: 'Настройки',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['settings'],
        visible: isProfileOwner,
      },
    ];
  }
}
