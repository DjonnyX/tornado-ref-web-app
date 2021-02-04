import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicensesAccountEditorContainer } from './licenses-account-editor.container';

const routes: Routes = [
  {
    path: '',
    component: LicensesAccountEditorContainer,
  },
  {
    path: 'view',
    loadChildren: () =>
      import('@containers/license-account-creator/license-account-creator.module').then(
        module => module.LicenseAccountCreatorModule,
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
export class LicensesAccountEditorRoutingModule { }
