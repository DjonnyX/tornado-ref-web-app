import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseAccountCreatorContainer } from './license-account-creator.container';
import { LicenseAccountCreatorFormModule } from '@components/forms/license-account-creator-form/license-account-creator-form.module';
import { LicenseAccountCreatorRoutingModule } from './license-account-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    LicenseAccountCreatorContainer,
  ],
  imports: [
    CommonModule,
    LicenseAccountCreatorRoutingModule,
    LicenseAccountCreatorFormModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class LicenseAccountCreatorModule { }
