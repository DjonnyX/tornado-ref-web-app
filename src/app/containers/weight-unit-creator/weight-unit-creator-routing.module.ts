import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeightUnitCreatorContainer } from './weight-unit-creator.container';

const routes: Routes = [
  {
    path: '',
    component: WeightUnitCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WeightUnitCreatorRoutingModule { }
