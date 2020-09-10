import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresEditorContainer } from './stores-editor.container';

const routes: Routes = [
  {
    path: '',
    component: StoresEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/store-creator/store-creator.module').then(
        module => module.StoreCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/store-creator/store-creator.module').then(
        module => module.StoreCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class StoresEditorRoutingModule { }
