import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DAdsComponent } from './dads.component';
import { DAdsRoutingModule } from './dads-routing.module';

@NgModule({
  declarations: [
    DAdsComponent,
  ],
  imports: [
    CommonModule,
    DAdsRoutingModule,
  ]
})
export class DAdsModule { }
