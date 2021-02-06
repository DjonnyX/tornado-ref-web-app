import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseAccountCreatorFormComponent } from './license-account-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LicenseAccountCreatorFormComponent,
  ],
  exports: [
    LicenseAccountCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    KeyValueModule,
  ]
})
export class LicenseAccountCreatorFormModule { }
