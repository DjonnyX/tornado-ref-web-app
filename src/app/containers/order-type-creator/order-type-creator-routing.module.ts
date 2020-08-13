import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderTypeCreatorContainer } from './order-type-creator.container';

const routes: Routes = [
  {
    path: '',
    component: OrderTypeCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrderTypeCreatorRoutingModule { }
