import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [
    PricePipe,
  ],
  exports: [
    PricePipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PricePipeModule { }
