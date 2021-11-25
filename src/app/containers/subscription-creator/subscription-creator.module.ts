import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionCreatorContainer } from './subscription-creator.container';
import { SubscriptionCreatorFormModule } from '@components/forms/subscription-creator-form/subscription-creator-form.module';
import { SubscriptionCreatorRoutingModule } from './subscription-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    SubscriptionCreatorContainer,
  ],
  imports: [
    CommonModule,
    SubscriptionCreatorRoutingModule,
    SubscriptionCreatorFormModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class SubscriptionCreatorModule { }
