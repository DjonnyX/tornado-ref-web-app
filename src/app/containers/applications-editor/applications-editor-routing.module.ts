import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsEditorContainer } from './applications-editor.container';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/application-creator/application-creator.module').then(
        module => module.ApplicationCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/application-creator/application-creator.module').then(
        module => module.ApplicationCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ApplicationsEditorRoutingModule { }
