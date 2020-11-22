import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseTypesEditorContainer } from './license-types-editor.container';

const routes: Routes = [
  {
    path: '',
    component: LicenseTypesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/license-type-creator/license-type-creator.module').then(
        module => module.LicenseTypeCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/license-type-creator/license-type-creator.module').then(
        module => module.LicenseTypeCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LicenseTypesEditorRoutingModule { }
