import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPeriodsEditorRoutingModule } from './business-periods-editor-routing.module';
import { BusinessPeriodsEditorContainer } from './business-periods-editor.container';
import { BusinessPeriodsEditorComponentModule } from '@components/business-periods-editor/business-periods-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    BusinessPeriodsEditorContainer,
  ],
  imports: [
    CommonModule,
    BusinessPeriodsEditorRoutingModule,
    BusinessPeriodsEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class BusinessPeriodsEditorModule { }
