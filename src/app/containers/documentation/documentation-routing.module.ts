import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationContainer } from './documentation.container';

const routes: Routes = [
  {
    path: '',
    component: DocumentationContainer,
  },
//   {
//     path: 'create',
//     loadChildren: () =>
//       import('@containers/currency-creator/currency-creator.module').then(
//         module => module.CurrencyCreatorModule,
//       )
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DocumentationRoutingModule { }
