import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule as NgxColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ColorPickerComponent,
  ],
  exports: [
    ColorPickerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    NgxColorPickerModule,
  ]
})
export class ColorPickerModule { }
