import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleCreatorContainer } from './role-creator.container';

const routes: Routes = [
  {
    path: '',
    component: RoleCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RoleCreatorRoutingModule { }
