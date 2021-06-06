import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppThemesEditorContainer } from './app-themes-editor.container';

const routes: Routes = [
  {
    path: '',
    component: AppThemesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/app-theme-creator/app-theme-creator.module').then(
        module => module.AppThemeCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/app-theme-creator/app-theme-creator.module').then(
        module => module.AppThemeCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppThemesEditorRoutingModule { }
