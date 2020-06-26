import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTreeEditorContainer } from './menu-tree-editor.container';
import { MenuTreeEditorRoutingModule } from './menu-tree-editor-routing.module';

@NgModule({
  declarations: [
    MenuTreeEditorContainer,
  ],
  imports: [
    CommonModule,
    MenuTreeEditorRoutingModule,
  ]
})
export class MenuTreeEditorModule { }
