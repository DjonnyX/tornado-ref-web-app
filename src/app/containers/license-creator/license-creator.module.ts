import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseCreatorContainer } from './license-creator.container';
import { LicenseCreatorFormModule } from '@components/forms/license-creator-form/license-creator-form.module';
import { LicenseCreatorRoutingModule } from './license-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    LicenseCreatorContainer,
  ],
  imports: [
    CommonModule,
    LicenseCreatorRoutingModule,
    LicenseCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class LicenseCreatorModule { }
