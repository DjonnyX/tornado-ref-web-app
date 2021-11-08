import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionCreatorContainer } from './subscription-creator.container';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SubscriptionCreatorRoutingModule { }
