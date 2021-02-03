import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeComponent } from '@components/date-range/date-range.component';

@NgModule({
  declarations: [
    DateRangeComponent,
  ],
  exports: [
    DateRangeComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class DateRangeModule { }
