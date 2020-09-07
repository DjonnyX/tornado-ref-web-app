import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsEditorContainer } from './ads-editor.container';

const routes: Routes = [
  {
    path: '',
    component: AdsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/ad-creator/ad-creator.module').then(
        module => module.AdCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/ad-creator/ad-creator.module').then(
        module => module.AdCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdsEditorRoutingModule { }
