import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainer } from './admin.container';

const routes: Routes = [
  {
    path: '',
    component: AdminContainer,
    children: [
      {
        path: 'menu-tree',
        loadChildren: () =>
          import('@containers/menu-tree-editor/menu-tree-editor.module').then(
            module => module.MenuTreeEditorModule,
          )
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@containers/products-editor/products-editor.module').then(
            module => module.ProductsEditorModule,
          )
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('@containers/tags-editor/tags-editor.module').then(
            module => module.TagsEditorModule,
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule { }
