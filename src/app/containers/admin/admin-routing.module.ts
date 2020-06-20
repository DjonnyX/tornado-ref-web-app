import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainer } from './admin.container';

const routes: Routes = [
  {
    path: '',
    component: AdminContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class AdminRoutingModule { }
