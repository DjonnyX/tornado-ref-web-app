import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordResultContainer } from './reset-password-result.container';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordResultContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ResetPasswordResultRoutingModule { }
