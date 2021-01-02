import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseCreatorContainer } from './license-creator.container';

const routes: Routes = [
  {
    path: '',
    component: LicenseCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LicenseCreatorRoutingModule { }
