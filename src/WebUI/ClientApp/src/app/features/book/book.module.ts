import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { RouterModule, Routes } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';

const routes: Routes = [
  {
    path: ':id',
    component: BookComponent,
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
  declarations: [BookComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-UA' }],
})
export class BookModule {}
