import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckuesEditorContainer } from './checkues-editor.container';

const routes: Routes = [
  {
    path: '',
    component: CheckuesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/checkue-creator/checkue-creator.module').then(
        module => module.CheckueCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/checkue-creator/checkue-creator.module').then(
        module => module.CheckueCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CheckuesEditorRoutingModule { }
