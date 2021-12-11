import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DModifiersComponent } from './dmodifiers.component';
import { DModifiersRoutingModule } from './dmodifiers-routing.module';

@NgModule({
  declarations: [
    DModifiersComponent,
  ],
  imports: [
    CommonModule,
    DModifiersRoutingModule,
  ]
})
export class DModifiersModule { }
