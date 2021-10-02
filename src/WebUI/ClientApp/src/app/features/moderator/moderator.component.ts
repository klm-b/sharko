import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss'],
})
export class ModeratorComponent implements OnInit {
  constructor() {}

  data_items!: MenuItem[];
  reports_items!: MenuItem[];

  ngOnInit() {
    this.data_items = [
      {
        label: 'Жалобы',
        icon: 'pi pi-fw pi-id-card',
      },
      { label: 'Жалобы', icon: 'pi pi-fw pi-image' },
      {
        label: 'Блокировки',
        icon: 'pi pi-fw pi-book',
      },
      {
        label: 'Оспаривание',
        icon: 'pi pi-fw pi-palette',
      },
    ];

    this.reports_items = [
      {
        label: 'Жалобы на книги',
        icon: 'pi pi-fw pi-th-large',
      },
      { label: 'Жалобы на конспекты', icon: 'pi pi-fw pi-unlock' },
      { label: 'Запросы на слияние', icon: 'pi pi-fw pi-list' },
      { label: 'Блокировки', icon: 'pi pi-fw pi-eject' },
    ];
  }
}
