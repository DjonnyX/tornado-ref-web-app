import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetEmailResultContainer } from './reset-email-result.container';

const routes: Routes = [
  {
    path: '',
    component: ResetEmailResultContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ResetEmailResultRoutingModule { }
