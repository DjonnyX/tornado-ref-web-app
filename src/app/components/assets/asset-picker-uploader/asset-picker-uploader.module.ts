import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetPickerUploaderComponent } from './asset-picker-uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileSelectorModule } from '../file-selector/file-selector.module';

@NgModule({
  declarations: [
    AssetPickerUploaderComponent,
  ],
  exports: [
    AssetPickerUploaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FileSelectorModule,
  ]
})
export class AssetPickerUploaderModule { }
