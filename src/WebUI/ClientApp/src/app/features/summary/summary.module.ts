import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { ReaderComponent } from './reader/reader.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EditorModule } from 'primeng/editor';
import { AddComponent } from './add/add.component';
import { ListboxModule } from 'primeng/listbox';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: 'new',
    component: AddComponent,
  },
  {
    path: ':id',
    component: SummaryComponent,
  },
  {
    path: ':id/:chapter',
    component: ReaderComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ChipModule,
    ButtonModule,
    DialogModule,
    MessagesModule,
    RippleModule,
    SkeletonModule,
    FormsModule,
    DividerModule,
    DataViewModule,
    InputTextareaModule,
    OverlayPanelModule,
    TooltipModule,
    EditorModule,
    InputTextModule,
    StepsModule,
    ListboxModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SummaryComponent, ReaderComponent, AddComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-UA' }],
})
export class SummaryModule {}
