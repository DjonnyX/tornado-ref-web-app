import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsEditorRoutingModule } from './products-editor-routing.module';
import { ProductsEditorContainer } from './products-editor.container';
import { ProductsEditorComponentModule } from '@components/products-editor/products-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    ProductsEditorContainer,
  ],
  imports: [
    CommonModule,
    ProductsEditorRoutingModule,
    ProductsEditorComponentModule,
    QueryProgressessModule,
  ],
})
export class ProductsEditorModule { }
