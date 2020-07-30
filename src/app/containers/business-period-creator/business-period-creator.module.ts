import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPeriodCreatorContainer } from './business-period-creator.container';
import { BusinessPeriodCreatorFormModule } from '@components/forms/business-period-creator-form/business-period-creator-form.module';
import { BusinessPeriodCreatorRoutingModule } from './business-period-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    BusinessPeriodCreatorContainer,
  ],
  imports: [
    CommonModule,
    BusinessPeriodCreatorRoutingModule,
    BusinessPeriodCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class BusinessPeriodCreatorModule { }
