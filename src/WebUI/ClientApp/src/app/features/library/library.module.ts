import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { RouterModule, Routes } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { BadgeModule } from 'primeng/badge';

const routes: Routes = [
  {
    path: ':category/:page',
    component: LibraryComponent,
  },
  {
    path: ':category',
    component: LibraryComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all',
  },
];

@NgModule({
  imports: [
    CommonModule,
    TagModule,
    ButtonModule,
    ChipModule,
    BadgeModule,
    DataViewModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LibraryComponent],
})
export class LibraryModule {}
