import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagCreatorContainer } from './tag-creator.container';
import { TagCreatorFormModule } from '@components/forms/tag-creator-form/tag-creator-form.module';
import { TagCreatorRoutingModule } from './tag-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    TagCreatorContainer,
  ],
  imports: [
    CommonModule,
    TagCreatorRoutingModule,
    TagCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class TagCreatorModule { }
