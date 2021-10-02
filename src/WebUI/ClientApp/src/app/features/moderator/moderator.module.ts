import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorComponent } from './moderator.component';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

const routes: Routes = [
  {
    path: '',
    component: ModeratorComponent,
  },
];

@NgModule({
  imports: [CommonModule, TabMenuModule, RouterModule.forChild(routes)],
  declarations: [ModeratorComponent],
})
export class ModeratorModule {}
