import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreatorContainer } from './product-creator.container';
import { ProductCreatorFormModule } from '@components/forms/product-creator-form/product-creator-form.module';
import { ProductCreatorRoutingModule } from './product-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { ProductHierarchyEditorModule } from '@components/product-hierarchy-editor/product-hierarchy-editor.module';

@NgModule({
  declarations: [
    ProductCreatorContainer,
  ],
  imports: [
    CommonModule,
    ProductCreatorRoutingModule,
    ProductCreatorFormModule,
    ProductHierarchyEditorModule,
    QueryProgressessModule,
  ]
})
export class ProductCreatorModule { }
