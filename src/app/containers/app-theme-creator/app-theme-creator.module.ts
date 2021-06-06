import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemeCreatorContainer } from './app-theme-creator.container';
import { AppThemeCreatorFormModule } from '@components/forms/app-theme-creator-form/app-theme-creator-form.module';
import { AppThemeCreatorRoutingModule } from './app-theme-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';

@NgModule({
  declarations: [
    AppThemeCreatorContainer,
  ],
  imports: [
    CommonModule,
    AppThemeCreatorRoutingModule,
    AppThemeCreatorFormModule,
    QueryProgressessModule,
    AssetsUploaderModule,
  ]
})
export class AppThemeCreatorModule { }
