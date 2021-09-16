import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeEmailContainer } from './change-email.container';

const routes: Routes = [
  {
    path: '',
    component: ChangeEmailContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ChangeEmailRoutingModule { }
