import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [CommonModule, TabMenuModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent],
})
export class AdminModule {}
