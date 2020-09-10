import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeContentComponent } from './order-type-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';
import { ColorPickerModule } from '@components/color-picker/color-picker.module';

@NgModule({
  declarations: [
    OrderTypeContentComponent,
  ],
  exports: [
    OrderTypeContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AssetPickerUploaderModule,
    ColorPickerModule,
  ]
})
export class OrderTypeContentModule { }
