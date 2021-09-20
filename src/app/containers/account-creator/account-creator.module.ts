import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCreatorContainer } from './account-creator.container';
import { AccountCreatorFormModule } from '@components/forms/account-creator-form/account-creator-form.module';
import { AccountCreatorRoutingModule } from './account-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    AccountCreatorContainer,
  ],
  imports: [
    CommonModule,
    AccountCreatorRoutingModule,
    AccountCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class AccountCreatorModule { }
