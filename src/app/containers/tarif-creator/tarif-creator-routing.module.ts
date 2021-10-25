import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarifCreatorContainer } from './tarif-creator.container';

const routes: Routes = [
  {
    path: '',
    component: TarifCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TarifCreatorRoutingModule { }
