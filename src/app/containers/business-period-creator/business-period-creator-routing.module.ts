import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessPeriodCreatorContainer } from './business-period-creator.container';

const routes: Routes = [
  {
    path: '',
    component: BusinessPeriodCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BusinessPeriodCreatorRoutingModule { }
