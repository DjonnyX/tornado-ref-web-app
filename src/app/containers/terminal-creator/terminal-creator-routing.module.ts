import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminalCreatorContainer } from './terminal-creator.container';

const routes: Routes = [
  {
    path: '',
    component: TerminalCreatorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TerminalCreatorRoutingModule { }
