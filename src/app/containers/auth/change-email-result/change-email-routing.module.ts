import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeEmailResultCotainer } from './change-email-result.container';

const routes: Routes = [
  {
    path: '',
    component: ChangeEmailResultCotainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ChangeEmailResultRoutingModule { }
