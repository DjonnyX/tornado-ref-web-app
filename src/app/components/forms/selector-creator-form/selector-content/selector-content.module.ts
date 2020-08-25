import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorContentComponent } from './selector-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    SelectorContentComponent,
  ],
  exports: [
    SelectorContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AssetPickerUploaderModule,
    AssetsUploaderModule,
    ColorPickerModule,
  ]
})
export class SelectorContentModule { }
