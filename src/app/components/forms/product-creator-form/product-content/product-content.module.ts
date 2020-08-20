import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductContentComponent } from './product-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    ProductContentComponent,
  ],
  exports: [
    ProductContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    AssetPickerUploaderModule,
    ColorPickerModule,
  ]
})
export class ProductContentModule { }
