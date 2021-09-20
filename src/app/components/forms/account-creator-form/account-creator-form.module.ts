import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCreatorFormComponent } from './account-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { MatSelectModule } from '@angular/material/select';
import { DateRangeModule } from '@components/date-range/date-range.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AccountCreatorFormComponent,
  ],
  exports: [
    AccountCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    KeyValueModule,
    DateRangeModule,
  ]
})
export class AccountCreatorFormModule { }
