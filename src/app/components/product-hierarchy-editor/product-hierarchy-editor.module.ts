import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHierarchyEditorComponent } from './product-hierarchy-editor.component';
import { NodeTreeModule } from '@components/node-tree/node-tree.module';

@NgModule({
  declarations: [
    ProductHierarchyEditorComponent,
  ],
  exports: [
    ProductHierarchyEditorComponent,
  ],
  imports: [
    CommonModule,
    NodeTreeModule,
  ]
})
export class ProductHierarchyEditorModule { }
