import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermOfUseContainer } from './term-of-use.container';

const routes: Routes = [
  {
    path: '',
    component: TermOfUseContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class TermOfUseRoutingModule { }
