import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsEditorContainer } from './products-editor.container';

const routes: Routes = [
  {
    path: '',
    component: ProductsEditorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProductsEditorRoutingModule { }
