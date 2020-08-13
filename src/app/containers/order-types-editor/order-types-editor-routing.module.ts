import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderTypesEditorContainer } from './order-types-editor.container';

const routes: Routes = [
  {
    path: '',
    component: OrderTypesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/order-type-creator/order-type-creator.module').then(
        module => module.OrderTypeCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/order-type-creator/order-type-creator.module').then(
        module => module.OrderTypeCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrderTypesEditorRoutingModule { }
