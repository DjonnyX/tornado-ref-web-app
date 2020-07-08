import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreatorContainer } from './product-creator.container';
import { ProductCreatorFormModule } from '@components/forms/product-creator-form/product-creator-form.module';
import { ProductCreatorRoutingModule } from './product-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { NodeTreeModule } from '@components/node-tree/node-tree.module';
import { FileSelectorModule } from '@components/assets/file-selector/file-selector.module';

@NgModule({
  declarations: [
    ProductCreatorContainer,
  ],
  imports: [
    CommonModule,
    ProductCreatorRoutingModule,
    ProductCreatorFormModule,
    QueryProgressessModule,
    NodeTreeModule,
    FileSelectorModule,
  ]
})
export class ProductCreatorModule { }
