import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTreeEditorContainer } from './menu-tree-editor.container';
import { MenuTreeEditorRoutingModule } from './menu-tree-editor-routing.module';
import { NodeTreeModule } from '@components/node-tree/node-tree.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    MenuTreeEditorContainer,
  ],
  imports: [
    CommonModule,
    MenuTreeEditorRoutingModule,
    QueryProgressessModule,
    NodeTreeModule,
  ]
})
export class MenuTreeEditorModule { }
