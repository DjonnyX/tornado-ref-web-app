import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalsEditorRoutingModule } from './terminals-editor-routing.module';
import { TerminalsEditorContainer } from './terminals-editor.container';
import { TerminalsEditorComponentModule } from '@components/terminals-editor/terminals-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    TerminalsEditorContainer,
  ],
  imports: [
    CommonModule,
    TerminalsEditorRoutingModule,
    TerminalsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class TerminalsEditorModule { }
