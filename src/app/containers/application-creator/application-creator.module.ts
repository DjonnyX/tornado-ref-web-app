import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationCreatorContainer } from './application-creator.container';
import { ApplicationCreatorFormModule } from '@components/forms/application-creator-form/application-creator-form.module';
import { ApplicationCreatorRoutingModule } from './application-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    ApplicationCreatorContainer,
  ],
  imports: [
    CommonModule,
    ApplicationCreatorRoutingModule,
    ApplicationCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class ApplicationCreatorModule { }
