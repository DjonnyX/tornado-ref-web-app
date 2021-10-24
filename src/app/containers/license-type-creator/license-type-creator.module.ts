import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseTypeCreatorContainer } from './license-type-creator.container';
import { LicenseTypeCreatorFormModule } from '@components/forms/license-type-creator-form/license-type-creator-form.module';
import { LicenseTypeCreatorRoutingModule } from './license-type-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    LicenseTypeCreatorContainer,
  ],
  imports: [
    CommonModule,
    LicenseTypeCreatorRoutingModule,
    LicenseTypeCreatorFormModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class LicenseTypeCreatorModule { }
