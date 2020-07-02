import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagCreatorContainer } from './tag-creator.container';

const routes: Routes = [
  {
    path: '',
    component: TagCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TagCreatorRoutingModule { }
