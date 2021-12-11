import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DProductsComponent } from './dproducts.component';
import { DProductsRoutingModule } from './dproducts-routing.module';

@NgModule({
  declarations: [
    DProductsComponent,
  ],
  imports: [
    CommonModule,
    DProductsRoutingModule,
  ]
})
export class DProductsModule { }
