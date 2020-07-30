import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TimeRangeComponent } from './time-range.component';

@NgModule({
  declarations: [
    TimeRangeComponent,
  ],
  exports: [
    TimeRangeComponent,
  ],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class TimeRangeModule { }
