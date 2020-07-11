import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreatorContainer } from './product-creator.container';
import { ProductCreatorFormModule } from '@components/forms/product-creator-form/product-creator-form.module';
import { ProductCreatorRoutingModule } from './product-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { NodeTreeModule } from '@components/node-tree/node-tree.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';

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
    AssetsUploaderModule,
  ]
})
export class ProductCreatorModule { }
