import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { AdCreatorFormModule } from '@components/forms/ad-creator-form/ad-creator-form.module';
import { AdCreatorRoutingModule } from './ad-creator-routing.module';
import { AdCreatorContainer } from './ad-creator.container';

@NgModule({
  declarations: [
    AdCreatorContainer,
  ],
  imports: [
    CommonModule,
    AdCreatorRoutingModule,
    AdCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class AdCreatorModule { }
