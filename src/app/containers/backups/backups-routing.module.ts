import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackupsContainer } from './backups.container';

const routes: Routes = [
  {
    path: '',
    component: BackupsContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BackupsRoutingModule { }
