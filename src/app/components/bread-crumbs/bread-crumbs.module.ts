import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from './bread-crumbs.component';

@NgModule({
  declarations: [
    BreadCrumbsComponent,
  ],
  exports: [
    BreadCrumbsComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class BreadCrumbsModule { }
