import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor() {}

  data_items!: MenuItem[];
  reports_items!: MenuItem[];
  control_items!: MenuItem[];

  ngOnInit() {
    this.data_items = [
      {
        label: 'Статистика',
        icon: 'pi pi-fw pi-id-card',
      },
      { label: 'Пользователи', icon: 'pi pi-fw pi-image' },
      {
        label: 'Книги',
        icon: 'pi pi-fw pi-book',
      },
      {
        label: 'Конспекты',
        icon: 'pi pi-fw pi-palette',
      },
      {
        label: 'Резервная копия',
        icon: 'pi pi-fw pi-shield',
      },
      {
        label: 'Категории',
        icon: 'pi pi-fw pi-shield',
      },
    ];

    this.reports_items = [
      {
        label: 'Генерация отчетов',
        icon: 'pi pi-fw pi-th-large',
      },
      { label: 'Отправка отчетов', icon: 'pi pi-fw pi-unlock' },
      { label: 'Пункт меню', icon: 'pi pi-fw pi-envelope' },
    ];

    this.control_items = [
      { label: 'Общее', icon: 'pi pi-fw pi-clock' },
      { label: 'Управление базой', icon: 'pi pi-fw pi-trash' },
    ];
  }
}
