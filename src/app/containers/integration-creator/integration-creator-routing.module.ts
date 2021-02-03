import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationCreatorContainer } from './integration-creator.container';

const routes: Routes = [
  {
    path: '',
    component: IntegrationCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class IntegrationCreatorRoutingModule { }
