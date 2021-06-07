import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradientColorEditorComponent } from './gradient-color-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from '@components/color-picker/color-picker.module';

@NgModule({
  declarations: [
    GradientColorEditorComponent,
  ],
  exports: [
    GradientColorEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ]
})
export class GradientColorEditorModule { }
