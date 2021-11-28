import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRegistrationComponent } from './dregistration.component';
import { DRegistrationRoutingModule } from './dregistration-routing.module';

@NgModule({
  declarations: [
    DRegistrationComponent,
  ],
  imports: [
    CommonModule,
    DRegistrationRoutingModule,
  ]
})
export class DRegistrationModule { }
