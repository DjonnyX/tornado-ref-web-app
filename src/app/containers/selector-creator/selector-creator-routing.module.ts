import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectorCreatorContainer } from './selector-creator.container';

const routes: Routes = [
  {
    path: '',
    component: SelectorCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SelectorCreatorRoutingModule { }
