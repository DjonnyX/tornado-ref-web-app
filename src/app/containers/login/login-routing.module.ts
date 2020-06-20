import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainer } from './login.container';

const routes: Routes = [
  {
    path: '',
    component: LoginContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class LoginRoutingModule { }
