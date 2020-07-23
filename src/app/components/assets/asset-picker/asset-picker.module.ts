import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetPickerComponent } from './asset-picker.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AssetPickerComponent,
  ],
  exports: [
    AssetPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class AssetPickerModule { }
