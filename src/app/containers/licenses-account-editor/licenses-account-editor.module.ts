import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensesAccountEditorRoutingModule } from './licenses-account-editor-routing.module';
import { LicensesAccountEditorContainer } from './licenses-account-editor.container';
import { LicensesAccountEditorComponentModule } from '@components/licenses-account-editor/licenses-account-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    LicensesAccountEditorContainer,
  ],
  imports: [
    CommonModule,
    LicensesAccountEditorRoutingModule,
    LicensesAccountEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class LicensesAccountEditorModule { }
