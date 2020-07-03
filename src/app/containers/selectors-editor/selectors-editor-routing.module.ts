import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectorsEditorContainer } from './selectors-editor.container';

const routes: Routes = [
  {
    path: '',
    component: SelectorsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/selector-creator/selector-creator.module').then(
        module => module.SelectorCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/selector-creator/selector-creator.module').then(
        module => module.SelectorCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SelectorsEditorRoutingModule { }
