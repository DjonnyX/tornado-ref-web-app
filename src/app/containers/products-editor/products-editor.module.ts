import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsEditorRoutingModule } from './products-editor-routing.module';
import { ProductsEditorContainer } from './products-editor.container';

@NgModule({
  declarations: [
    ProductsEditorContainer,
  ],
  imports: [
    CommonModule,
    ProductsEditorRoutingModule,
  ]
})
export class ProductsEditorModule { }
