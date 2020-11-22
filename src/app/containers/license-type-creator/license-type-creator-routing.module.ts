import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseTypeCreatorContainer } from './license-type-creator.container';

const routes: Routes = [
  {
    path: '',
    component: LicenseTypeCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LicenseTypeCreatorRoutingModule { }
