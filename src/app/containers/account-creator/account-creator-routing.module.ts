import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreatorContainer } from './account-creator.container';

const routes: Routes = [
  {
    path: '',
    component: AccountCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AccountCreatorRoutingModule { }
