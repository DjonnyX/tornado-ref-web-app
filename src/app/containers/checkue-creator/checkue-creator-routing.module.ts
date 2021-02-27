import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckueCreatorContainer } from './checkue-creator.container';

const routes: Routes = [
  {
    path: '',
    component: CheckueCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CheckueCreatorRoutingModule { }
