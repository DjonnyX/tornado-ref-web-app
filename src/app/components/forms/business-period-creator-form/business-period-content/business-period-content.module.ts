import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BusinessPeriodContentComponent } from './business-period-content.component';
import { KeyValueModule } from '@components/key-value/key-value.module';

@NgModule({
  declarations: [
    BusinessPeriodContentComponent,
  ],
  exports: [
    BusinessPeriodContentComponent,
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
export class BusinessPeriodContentModule { }
