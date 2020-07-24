import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessPeriodsEditorContainer } from './business-periods-editor.container';

const routes: Routes = [
  {
    path: '',
    component: BusinessPeriodsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/business-period-creator/business-period-creator.module').then(
        module => module.BusinessPeriodCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/business-period-creator/business-period-creator.module').then(
        module => module.BusinessPeriodCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BusinessPeriodsEditorRoutingModule { }
