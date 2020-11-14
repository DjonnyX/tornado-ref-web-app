import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupContainer } from './signup.container';

const routes: Routes = [
  {
    path: '',
    component: SignupContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class SignupRoutingModule { }
