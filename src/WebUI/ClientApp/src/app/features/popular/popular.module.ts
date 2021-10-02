import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularComponent } from './popular.component';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

const routes: Routes = [
  {
    path: '',
    component: PopularComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    TabMenuModule,
    DividerModule,
    FormsModule,
    DividerModule,
    DropdownModule,
    SelectButtonModule,
    DataViewModule,
    ButtonModule,
    ChipModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PopularComponent],
})
export class PopularModule {}
