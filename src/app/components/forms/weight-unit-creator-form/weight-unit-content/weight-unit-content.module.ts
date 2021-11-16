import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitContentComponent } from './weight-unit-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KeyValueModule } from '@components/key-value/key-value.module';

@NgModule({
  declarations: [
    WeightUnitContentComponent,
  ],
  exports: [
    WeightUnitContentComponent,
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
export class WeightUnitContentModule { }
