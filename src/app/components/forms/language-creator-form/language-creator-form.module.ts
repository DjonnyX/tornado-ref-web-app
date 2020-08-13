import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageCreatorFormComponent } from './language-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ColorPickerModule } from 'ngx-color-picker';
import { AssetPickerUploaderModule } from '@components/assets/asset-picker-uploader/asset-picker-uploader.module';

@NgModule({
  declarations: [
    LanguageCreatorFormComponent,
  ],
  exports: [
    LanguageCreatorFormComponent,
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
export class LanguageCreatorFormModule { }
