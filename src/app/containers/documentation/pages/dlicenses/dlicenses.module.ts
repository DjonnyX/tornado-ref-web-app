import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DLicensesComponent } from './dlicenses.component';
import { DLicensesRoutingModule } from './dlicenses-routing.module';

@NgModule({
  declarations: [
    DLicensesComponent,
  ],
  imports: [
    CommonModule,
    DLicensesRoutingModule,
  ]
})
export class DLicensesModule { }
