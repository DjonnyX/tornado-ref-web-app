import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesEditorRoutingModule } from './languages-editor-routing.module';
import { LanguagesEditorContainer } from './languages-editor.container';
import { LanguagesEditorComponentModule } from '@components/languages-editor/languages-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    LanguagesEditorContainer,
  ],
  imports: [
    CommonModule,
    LanguagesEditorRoutingModule,
    LanguagesEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class LanguagesEditorModule { }
