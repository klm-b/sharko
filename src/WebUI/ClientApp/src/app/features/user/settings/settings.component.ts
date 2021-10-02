import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  profile_items!: MenuItem[];
  security_items!: MenuItem[];
  account_items!: MenuItem[];

  ngOnInit() {
    this.profile_items = [
      {
        label: 'Личная информация',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['personal'],
      },
      { label: 'Аватар', icon: 'pi pi-fw pi-image', routerLink: ['avatar'] },
      {
        label: 'Приватность',
        icon: 'pi pi-fw pi-shield',
        routerLink: ['privacy'],
      },
      {
        label: 'Мои предпочтения',
        icon: 'pi pi-fw pi-palette',
        routerLink: ['preferences'],
      },
    ];

    this.security_items = [
      {
        label: 'Способ авторизации',
        icon: 'pi pi-fw pi-th-large',
        routerLink: ['authorization'],
      },
      { label: 'Смена пароля', icon: 'pi pi-fw pi-unlock' },
      { label: 'Смена почты', icon: 'pi pi-fw pi-envelope' },
    ];

    this.account_items = [
      { label: 'Оповещения', icon: 'pi pi-fw pi-clock' },
      { label: 'Удалить аккаунт', icon: 'pi pi-fw pi-trash' },
    ];
  }
}
