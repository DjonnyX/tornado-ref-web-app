import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceCreatorComponent } from './price-creator.component';

@NgModule({
  declarations: [
    PriceCreatorComponent,
  ],
  exports: [
    PriceCreatorComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class PriceCreatorModule { }
