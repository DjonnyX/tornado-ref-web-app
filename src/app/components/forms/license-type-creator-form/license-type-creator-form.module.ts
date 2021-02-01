import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseTypeCreatorFormComponent } from './license-type-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PricePipeModule } from '@app/pipes/price/price-pipe.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LicenseTypeCreatorFormComponent,
  ],
  exports: [
    LicenseTypeCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    PricePipeModule,
  ]
})
export class LicenseTypeCreatorFormModule { }
