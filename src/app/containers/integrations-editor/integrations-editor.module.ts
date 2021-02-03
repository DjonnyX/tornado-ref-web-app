import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationsEditorRoutingModule } from './integrations-editor-routing.module';
import { IntegrationsEditorContainer } from './integrations-editor.container';
import { IntegrationsEditorComponentModule } from '@components/integrations-editor/integrations-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    IntegrationsEditorContainer,
  ],
  imports: [
    CommonModule,
    IntegrationsEditorRoutingModule,
    IntegrationsEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class IntegrationsEditorModule { }
