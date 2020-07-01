import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreatorContainer } from './product-creator.container';

const routes: Routes = [
  {
    path: '',
    component: ProductCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProductCreatorRoutingModule { }
