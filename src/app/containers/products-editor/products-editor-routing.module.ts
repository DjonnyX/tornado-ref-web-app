import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsEditorContainer } from './products-editor.container';

const routes: Routes = [
  {
    path: '',
    component: ProductsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/product-creator/product-creator.module').then(
        module => module.ProductCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/product-creator/product-creator.module').then(
        module => module.ProductCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProductsEditorRoutingModule { }
