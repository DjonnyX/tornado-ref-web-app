import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsEditorContainer } from './subscriptions-editor.container';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/subscription-creator/subscription-creator.module').then(
        module => module.SubscriptionCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/subscription-creator/subscription-creator.module').then(
        module => module.SubscriptionCreatorModule,
      )
  },
  {
    path: 'view',
    loadChildren: () =>
      import('@containers/subscription-creator/subscription-creator.module').then(
        module => module.SubscriptionCreatorModule,
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
export class SubscriptionsEditorRoutingModule { }
