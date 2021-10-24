import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckuesEditorRoutingModule } from './checkues-editor-routing.module';
import { CheckuesEditorContainer } from './checkues-editor.container';
import { CheckuesEditorComponentModule } from '@components/checkues-editor/checkues-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    CheckuesEditorContainer,
  ],
  imports: [
    CommonModule,
    CheckuesEditorRoutingModule,
    CheckuesEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class CheckuesEditorModule { }
