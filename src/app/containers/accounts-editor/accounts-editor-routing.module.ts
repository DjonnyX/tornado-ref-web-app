import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsEditorContainer } from './accounts-editor.container';

const routes: Routes = [
  {
    path: '',
    component: AccountsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/account-creator/account-creator.module').then(
        module => module.AccountCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/account-creator/account-creator.module').then(
        module => module.AccountCreatorModule,
      )
  },
  {
    path: 'view',
    loadChildren: () =>
      import('@containers/account-creator/account-creator.module').then(
        module => module.AccountCreatorModule,
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
export class AccountsEditorRoutingModule { }
