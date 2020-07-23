import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsEditorRoutingModule } from './assets-editor-routing.module';
import { AssetsEditorContainer } from './assets-editor.container';
import { AssetsEditorComponentModule } from '@components/assets-editor/assets-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    AssetsEditorContainer,
  ],
  imports: [
    CommonModule,
    AssetsEditorRoutingModule,
    AssetsEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class AssetsEditorModule { }
