import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetEmailContainer } from './reset-email.container';
import { ResetEmailVerifyTokenGuard } from './reset-email-verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: ResetEmailContainer,
    canActivate: [
      ResetEmailVerifyTokenGuard,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ResetEmailRoutingModule { }
