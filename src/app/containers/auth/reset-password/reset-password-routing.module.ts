import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordContainer } from './reset-password.container';
import { ResetPasswordVerifyTokenGuard } from './reset-password-verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordContainer,
    canActivate: [
      ResetPasswordVerifyTokenGuard,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ResetPasswordRoutingModule { }
