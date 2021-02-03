import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationsEditorContainer } from './integrations-editor.container';

const routes: Routes = [
  {
    path: '',
    component: IntegrationsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/integration-creator/integration-creator.module').then(
        module => module.IntegrationCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/integration-creator/integration-creator.module').then(
        module => module.IntegrationCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class IntegrationsEditorRoutingModule { }
