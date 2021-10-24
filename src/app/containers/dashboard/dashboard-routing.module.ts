import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContainer } from './dashboard.container';

const routes: Routes = [
  {
    path: '',
    component: DashboardContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/product-creator/product-creator.module').then(
        module => module.ProductCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/product-creator/product-creator.module').then(
        module => module.ProductCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DashboardRoutingModule { }
