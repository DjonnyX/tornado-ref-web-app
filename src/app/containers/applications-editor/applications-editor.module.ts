import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsEditorRoutingModule } from './applications-editor-routing.module';
import { ApplicationsEditorContainer } from './applications-editor.container';
import { ApplicationsEditorComponentModule } from '@components/applications-editor/applications-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    ApplicationsEditorContainer,
  ],
  imports: [
    CommonModule,
    ApplicationsEditorRoutingModule,
    ApplicationsEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class ApplicationsEditorModule { }
