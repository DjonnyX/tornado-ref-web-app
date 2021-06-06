import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppThemeCreatorContainer } from './app-theme-creator.container';

const routes: Routes = [
  {
    path: '',
    component: AppThemeCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppThemeCreatorRoutingModule { }
