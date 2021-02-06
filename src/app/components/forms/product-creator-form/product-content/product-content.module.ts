import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductContentComponent } from './product-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from '@components/color-picker/color-picker.module';
import { KeyValueModule } from '@components/key-value/key-value.module';

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
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    AssetPickerUploaderModule,
    AssetsUploaderModule,
    ColorPickerModule,
    KeyValueModule,
  ]
})
export class ProductContentModule { }
