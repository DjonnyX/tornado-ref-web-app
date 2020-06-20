import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainer } from './admin.container';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminContainer,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
