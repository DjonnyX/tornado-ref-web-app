import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordContainer } from './reset-password.container';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ResetPasswordRoutingModule { }
