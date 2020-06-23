import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordContainer } from './forgot-password.container';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ForgotPasswordRoutingModule { }
