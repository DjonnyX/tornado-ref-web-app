import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesEditorRoutingModule } from './currencies-editor-routing.module';
import { CurrenciesEditorContainer } from './currencies-editor.container';
import { CurrenciesEditorComponentModule } from '@components/currencies-editor/currencies-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    CurrenciesEditorContainer,
  ],
  imports: [
    CommonModule,
    CurrenciesEditorRoutingModule,
    CurrenciesEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class CurrenciesEditorModule { }
