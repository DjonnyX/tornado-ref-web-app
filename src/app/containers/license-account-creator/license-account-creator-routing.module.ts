import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseAccountCreatorContainer } from './license-account-creator.container';

const routes: Routes = [
  {
    path: '',
    component: LicenseAccountCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LicenseAccountCreatorRoutingModule { }
