import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthErrorContainer } from './auth-error.container';

const routes: Routes = [
  {
    path: '',
    component: AuthErrorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class AuthErrorRoutingModule { }
