import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../schedule/schedule.component';
import { TimeRangeModule } from '@components/time-range/time-range.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WeekDaysPickerModule } from '@components/week-days-picker/week-days-picker.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    ScheduleComponent,
  ],
  exports: [
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    TimeRangeModule,
    WeekDaysPickerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ]
})
export class ScheduleModule { }
