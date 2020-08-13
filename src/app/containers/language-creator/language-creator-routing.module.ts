import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageCreatorContainer } from './language-creator.container';

const routes: Routes = [
  {
    path: '',
    component: LanguageCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LanguageCreatorRoutingModule { }
