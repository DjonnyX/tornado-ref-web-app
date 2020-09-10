import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCreatorContainer } from './store-creator.container';
import { StoreCreatorFormModule } from '@components/forms/store-creator-form/store-creator-form.module';
import { StoreCreatorRoutingModule } from './store-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    StoreCreatorContainer,
  ],
  imports: [
    CommonModule,
    StoreCreatorRoutingModule,
    StoreCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class StoreCreatorModule { }
