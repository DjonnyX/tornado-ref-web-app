import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorsEditorRoutingModule } from './selectors-editor-routing.module';
import { SelectorsEditorContainer } from './selectors-editor.container';
import { SelectorsEditorComponentModule } from '@components/selectors-editor/selectors-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    SelectorsEditorContainer,
  ],
  imports: [
    CommonModule,
    SelectorsEditorRoutingModule,
    SelectorsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class SelectorsEditorModule { }
