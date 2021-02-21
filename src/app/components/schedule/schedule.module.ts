import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../schedule/schedule.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WeekDaysPickerModule } from '@components/week-days-picker/week-days-picker.module';
import { MatMenuModule } from '@angular/material/menu';
import { TimePickerModule } from '@components/time-picker/time-picker.module';

@NgModule({
  declarations: [
    ScheduleComponent,
  ],
  exports: [
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    TimePickerModule,
    WeekDaysPickerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class ScheduleModule { }
