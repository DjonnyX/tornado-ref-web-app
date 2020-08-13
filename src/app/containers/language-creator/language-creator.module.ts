import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageCreatorContainer } from './language-creator.container';
import { LanguageCreatorFormModule } from '@components/forms/language-creator-form/language-creator-form.module';
import { LanguageCreatorRoutingModule } from './language-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';

@NgModule({
  declarations: [
    LanguageCreatorContainer,
  ],
  imports: [
    CommonModule,
    LanguageCreatorRoutingModule,
    LanguageCreatorFormModule,
    QueryProgressessModule,
    AssetsUploaderModule,
  ]
})
export class LanguageCreatorModule { }
