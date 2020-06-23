import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninContainer } from './signin.container';

const routes: Routes = [
  {
    path: '',
    component: SigninContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class SigninRoutingModule { }
