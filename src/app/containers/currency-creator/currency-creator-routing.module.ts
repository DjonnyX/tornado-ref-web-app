import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyCreatorContainer } from './currency-creator.container';

const routes: Routes = [
  {
    path: '',
    component: CurrencyCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CurrencyCreatorRoutingModule { }
