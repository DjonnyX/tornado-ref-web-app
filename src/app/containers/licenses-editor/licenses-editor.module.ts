import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensesEditorRoutingModule } from './licenses-editor-routing.module';
import { LicensesEditorContainer } from './licenses-editor.container';
import { LicensesEditorComponentModule } from '@components/licenses-editor/licenses-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    LicensesEditorContainer,
  ],
  imports: [
    CommonModule,
    LicensesEditorRoutingModule,
    LicensesEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class LicensesEditorModule { }
