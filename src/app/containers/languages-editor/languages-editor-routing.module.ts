import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguagesEditorContainer } from './languages-editor.container';

const routes: Routes = [
  {
    path: '',
    component: LanguagesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/language-creator/language-creator.module').then(
        module => module.LanguageCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/language-creator/language-creator.module').then(
        module => module.LanguageCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LanguagesEditorRoutingModule { }
