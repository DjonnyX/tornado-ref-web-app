import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPeriodCreatorFormComponent } from './business-period-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleModule } from '@components/schedule/schedule.module';
import { BusinessPeriodContentModule } from './business-period-content/business-period-content.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    BusinessPeriodCreatorFormComponent,
  ],
  exports: [
    BusinessPeriodCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    ScheduleModule,
    BusinessPeriodContentModule,
  ]
})
export class BusinessPeriodCreatorFormModule { }
