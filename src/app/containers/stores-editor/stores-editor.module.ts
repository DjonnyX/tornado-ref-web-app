import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresEditorRoutingModule } from './stores-editor-routing.module';
import { StoresEditorContainer } from './stores-editor.container';
import { StoresEditorComponentModule } from '@components/stores-editor/stores-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    StoresEditorContainer,
  ],
  imports: [
    CommonModule,
    StoresEditorRoutingModule,
    StoresEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class StoresEditorModule { }
