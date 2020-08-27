import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagContentComponent } from './tag-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    TagContentComponent,
  ],
  exports: [
    TagContentComponent,
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
export class TagContentModule { }
