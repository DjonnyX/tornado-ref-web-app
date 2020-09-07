import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdCreatorContainer } from './ad-creator.container';

const routes: Routes = [
  {
    path: '',
    component: AdCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdCreatorRoutingModule { }
