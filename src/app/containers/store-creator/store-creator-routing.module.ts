import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCreatorContainer } from './store-creator.container';

const routes: Routes = [
  {
    path: '',
    component: StoreCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class StoreCreatorRoutingModule { }
