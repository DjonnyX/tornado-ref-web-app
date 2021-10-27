import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifsEditorRoutingModule } from './tarifs-editor-routing.module';
import { TarifsEditorContainer } from './tarifs-editor.container';
import { TarifsEditorComponentModule } from '@components/tarifs-editor/tarifs-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    TarifsEditorContainer,
  ],
  imports: [
    CommonModule,
    TarifsEditorRoutingModule,
    TarifsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class TarifsEditorModule { }
