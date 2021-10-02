import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { RouterModule, Routes } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';

const routes: Routes = [
  {
    path: ':id',
    component: AuthorComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ChipModule,
    ButtonModule,
    RippleModule,
    SkeletonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AuthorComponent],
})
export class AuthorModule {}
