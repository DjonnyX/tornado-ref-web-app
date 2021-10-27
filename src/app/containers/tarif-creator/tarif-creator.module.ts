import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifCreatorContainer } from './tarif-creator.container';
import { TarifCreatorFormModule } from '@components/forms/tarif-creator-form/tarif-creator-form.module';
import { TarifCreatorRoutingModule } from './tarif-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    TarifCreatorContainer,
  ],
  imports: [
    CommonModule,
    TarifCreatorRoutingModule,
    TarifCreatorFormModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class TarifCreatorModule { }
