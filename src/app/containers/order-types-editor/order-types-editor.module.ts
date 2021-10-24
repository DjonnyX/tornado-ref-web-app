import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypesEditorRoutingModule } from './order-types-editor-routing.module';
import { OrderTypesEditorContainer } from './order-types-editor.container';
import { OrderTypesEditorComponentModule } from '@components/order-types-editor/order-types-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    OrderTypesEditorContainer,
  ],
  imports: [
    CommonModule,
    OrderTypesEditorRoutingModule,
    OrderTypesEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class OrderTypesEditorModule { }
