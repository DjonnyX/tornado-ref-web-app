import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekDaysPickerComponent } from './week-days-picker.component';

@NgModule({
  declarations: [
    WeekDaysPickerComponent,
  ],
  exports: [
    WeekDaysPickerComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class WeekDaysPickerModule { }
