import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsEditorRoutingModule } from './accounts-editor-routing.module';
import { AccountsEditorContainer } from './accounts-editor.container';
import { AccountsEditorComponentModule } from '@components/accounts-editor/accounts-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    AccountsEditorContainer,
  ],
  imports: [
    CommonModule,
    AccountsEditorRoutingModule,
    AccountsEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class AccountsEditorModule { }
