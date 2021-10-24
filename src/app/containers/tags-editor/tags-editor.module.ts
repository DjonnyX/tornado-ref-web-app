import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsEditorRoutingModule } from './tags-editor-routing.module';
import { TagsEditorContainer } from './tags-editor.container';
import { TagsEditorComponentModule } from '@components/tags-editor/tags-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    TagsEditorContainer,
  ],
  imports: [
    CommonModule,
    TagsEditorRoutingModule,
    TagsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class TagsEditorModule { }
