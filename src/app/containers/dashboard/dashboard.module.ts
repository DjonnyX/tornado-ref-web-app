import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponentModule } from '@components/dashboard/dashboard.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    DashboardContainer,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class DashboardModule { }
