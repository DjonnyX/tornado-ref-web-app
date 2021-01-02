import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicensesEditorContainer } from './licenses-editor.container';

const routes: Routes = [
  {
    path: '',
    component: LicensesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/license-creator/license-creator.module').then(
        module => module.LicenseCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/license-creator/license-creator.module').then(
        module => module.LicenseCreatorModule,
      )
  },
  {
    path: 'view',
    loadChildren: () =>
      import('@containers/license-creator/license-creator.module').then(
        module => module.LicenseCreatorModule,
      ),
      data: {
        hasEdit: false,
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LicensesEditorRoutingModule { }
