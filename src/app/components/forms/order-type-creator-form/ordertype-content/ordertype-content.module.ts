import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeContentComponent } from './ordertype-content.component';

@NgModule({
  declarations: [
    OrderTypeContentComponent,
  ],
  exports: [
    OrderTypeContentComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class OrderTypeContentModule { }
