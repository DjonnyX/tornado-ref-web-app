import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordResultCotainer } from './forgot-password-result.container';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordResultCotainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ForgotPasswordResultRoutingModule { }
