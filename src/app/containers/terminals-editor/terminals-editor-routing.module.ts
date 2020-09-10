import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminalsEditorContainer } from './terminals-editor.container';

const routes: Routes = [
  {
    path: '',
    component: TerminalsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/terminal-creator/terminal-creator.module').then(
        module => module.TerminalCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/terminal-creator/terminal-creator.module').then(
        module => module.TerminalCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TerminalsEditorRoutingModule { }
