import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DUsersComponent } from './dusers.component';
import { DUsersRoutingModule } from './dusers-routing.module';

@NgModule({
  declarations: [
    DUsersComponent,
  ],
  imports: [
    CommonModule,
    DUsersRoutingModule,
  ]
})
export class DUsersModule { }
