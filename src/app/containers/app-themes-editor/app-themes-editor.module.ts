import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemesEditorRoutingModule } from './app-themes-editor-routing.module';
import { AppThemesEditorContainer } from './app-themes-editor.container';
import { AppThemesEditorComponentModule } from '@components/app-themes-editor/app-themes-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    AppThemesEditorContainer,
  ],
  imports: [
    CommonModule,
    AppThemesEditorRoutingModule,
    AppThemesEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class AppThemesEditorModule { }
