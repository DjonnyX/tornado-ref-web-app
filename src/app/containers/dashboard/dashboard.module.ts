import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponentModule } from '@components/dashboard/dashboard.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    DashboardContainer,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponentModule,
    QueryProgressessModule,
  ],
})
export class DashboardModule { }
