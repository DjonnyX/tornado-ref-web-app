import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitCreatorContainer } from './weight-unit-creator.container';
import { WeightUnitCreatorFormModule } from '@components/forms/weight-unit-creator-form/weight-unit-creator-form.module';
import { WeightUnitCreatorRoutingModule } from './weight-unit-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    WeightUnitCreatorContainer,
  ],
  imports: [
    CommonModule,
    WeightUnitCreatorRoutingModule,
    WeightUnitCreatorFormModule,
    QueryProgressessModule,
    AssetsUploaderModule,
    MainFooterModule,
  ]
})
export class WeightUnitCreatorModule { }
