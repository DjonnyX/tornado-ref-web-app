import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarifsEditorContainer } from './tarifs-editor.container';

const routes: Routes = [
  {
    path: '',
    component: TarifsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/tarif-creator/tarif-creator.module').then(
        module => module.TarifCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/tarif-creator/tarif-creator.module').then(
        module => module.TarifCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TarifsEditorRoutingModule { }
