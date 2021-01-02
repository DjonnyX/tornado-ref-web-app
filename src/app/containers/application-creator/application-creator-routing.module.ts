import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationCreatorContainer } from './application-creator.container';

const routes: Routes = [
  {
    path: '',
    component: ApplicationCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ApplicationCreatorRoutingModule { }
