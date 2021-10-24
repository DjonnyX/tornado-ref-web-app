import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyCreatorContainer } from './currency-creator.container';
import { CurrencyCreatorFormModule } from '@components/forms/currency-creator-form/currency-creator-form.module';
import { CurrencyCreatorRoutingModule } from './currency-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    CurrencyCreatorContainer,
  ],
  imports: [
    CommonModule,
    CurrencyCreatorRoutingModule,
    CurrencyCreatorFormModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class CurrencyCreatorModule { }
