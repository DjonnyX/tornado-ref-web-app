import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeCreatorContainer } from './order-type-creator.container';
import { OrderTypeCreatorFormModule } from '@components/forms/order-type-creator-form/order-type-creator-form.module';
import { OrderTypeCreatorRoutingModule } from './order-type-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';

@NgModule({
  declarations: [
    OrderTypeCreatorContainer,
  ],
  imports: [
    CommonModule,
    OrderTypeCreatorRoutingModule,
    OrderTypeCreatorFormModule,
    QueryProgressessModule,
    AssetsUploaderModule,
  ]
})
export class OrderTypeCreatorModule { }
