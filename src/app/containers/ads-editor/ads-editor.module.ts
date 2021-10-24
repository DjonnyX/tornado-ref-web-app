import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsEditorRoutingModule } from './ads-editor-routing.module';
import { AdsEditorContainer } from './ads-editor.container';
import { AdsEditorComponentModule } from '@components/ads-editor/ads-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    AdsEditorContainer,
  ],
  imports: [
    CommonModule,
    AdsEditorRoutingModule,
    AdsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class AdsEditorModule { }
