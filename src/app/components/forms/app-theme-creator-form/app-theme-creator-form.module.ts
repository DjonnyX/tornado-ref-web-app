import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemeCreatorFormComponent } from './app-theme-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { ColorPickerModule } from '@components/color-picker/color-picker.module';

@NgModule({
  declarations: [
    AppThemeCreatorFormComponent,
  ],
  exports: [
    AppThemeCreatorFormComponent,
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
    KeyValueModule,
  ]
})
export class AppThemeCreatorFormModule { }
