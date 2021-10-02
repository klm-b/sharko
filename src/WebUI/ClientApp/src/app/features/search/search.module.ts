import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

const routes: Routes = [
  {
    path: ':query',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DataViewModule,
    ChipModule,
    TabMenuModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SearchComponent],
})
export class SearchModule {}
