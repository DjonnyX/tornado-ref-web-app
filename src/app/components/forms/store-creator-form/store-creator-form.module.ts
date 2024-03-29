import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCreatorFormComponent } from './store-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { KeyValueModule } from '@components/key-value/key-value.module';

@NgModule({
  declarations: [
    StoreCreatorFormComponent,
  ],
  exports: [
    StoreCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    KeyValueModule,
  ]
})
export class StoreCreatorFormModule { }
