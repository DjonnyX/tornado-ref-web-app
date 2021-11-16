import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeightUnitsEditorContainer } from './weight-units-editor.container';

const routes: Routes = [
  {
    path: '',
    component: WeightUnitsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/weight-unit-creator/weight-unit-creator.module').then(
        module => module.WeightUnitCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/weight-unit-creator/weight-unit-creator.module').then(
        module => module.WeightUnitCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class WeightUnitsEditorRoutingModule { }
