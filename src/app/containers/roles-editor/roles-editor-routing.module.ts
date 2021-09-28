import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesEditorContainer } from './roles-editor.container';

const routes: Routes = [
  {
    path: '',
    component: RolesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/role-creator/role-creator.module').then(
        module => module.RoleCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/role-creator/role-creator.module').then(
        module => module.RoleCreatorModule,
      )
  },
  {
    path: 'view',
    loadChildren: () =>
      import('@containers/role-creator/role-creator.module').then(
        module => module.RoleCreatorModule,
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
export class RolesEditorRoutingModule { }
