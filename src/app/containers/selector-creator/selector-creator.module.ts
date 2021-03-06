import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCreatorContainer } from './selector-creator.container';
import { SelectorCreatorFormModule } from '@components/forms/selector-creator-form/selector-creator-form.module';
import { SelectorCreatorRoutingModule } from './selector-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { NodeTreeModule } from '@components/node-tree/node-tree.module';

@NgModule({
  declarations: [
    SelectorCreatorContainer,
  ],
  imports: [
    CommonModule,
    SelectorCreatorRoutingModule,
    SelectorCreatorFormModule,
    QueryProgressessModule,
    NodeTreeModule,
  ]
})
export class SelectorCreatorModule { }
