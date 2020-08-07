import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrenciesEditorContainer } from './currencies-editor.container';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/currency-creator/currency-creator.module').then(
        module => module.CurrencyCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/currency-creator/currency-creator.module').then(
        module => module.CurrencyCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CurrenciesEditorRoutingModule { }
