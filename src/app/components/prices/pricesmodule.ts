import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesComponent } from './prices.component';
import { PriceModule } from '@components/price/price.module';

@NgModule({
  declarations: [
    PricesComponent,
  ],
  exports: [
    PricesComponent,
  ],
  imports: [
    CommonModule,
    PriceModule,
  ]
})
export class PricesModule { }
