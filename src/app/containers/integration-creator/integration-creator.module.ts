import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationCreatorContainer } from './integration-creator.container';
import { IntegrationCreatorFormModule } from '@components/forms/integration-creator-form/integration-creator-form.module';
import { IntegrationCreatorRoutingModule } from './integration-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    IntegrationCreatorContainer,
  ],
  imports: [
    CommonModule,
    IntegrationCreatorRoutingModule,
    IntegrationCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class IntegrationCreatorModule { }
