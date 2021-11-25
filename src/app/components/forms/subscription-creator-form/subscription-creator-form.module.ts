import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionCreatorFormComponent } from './subscription-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SubscriptionCreatorFormComponent,
  ],
  exports: [
    SubscriptionCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    KeyValueModule,
  ]
})
export class SubscriptionCreatorFormModule { }
