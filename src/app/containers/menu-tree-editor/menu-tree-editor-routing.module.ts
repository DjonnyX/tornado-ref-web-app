import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuTreeEditorContainer } from './menu-tree-editor.container';

const routes: Routes = [
  {
    path: '',
    component: MenuTreeEditorContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MenuTreeEditorRoutingModule { }
