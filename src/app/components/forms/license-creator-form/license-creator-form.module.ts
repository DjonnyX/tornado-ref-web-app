import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseCreatorFormComponent } from './license-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PricePipe } from '@app/pipes/price.pipe';
import { KeyValueModule } from '@components/key-value/key-value.module';

@NgModule({
  declarations: [
    LicenseCreatorFormComponent,
    PricePipe,
  ],
  exports: [
    LicenseCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    KeyValueModule,
  ]
})
export class LicenseCreatorFormModule { }
