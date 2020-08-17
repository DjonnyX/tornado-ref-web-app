import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageCreatorContainer } from './language-creator.container';
import { LanguageCreatorFormModule } from '@components/forms/language-creator-form/language-creator-form.module';
import { LanguageCreatorRoutingModule } from './language-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { TranslateFormModule } from '@components/forms/translate-form/translate-form.module';

@NgModule({
  declarations: [
    LanguageCreatorContainer,
  ],
  imports: [
    CommonModule,
    LanguageCreatorRoutingModule,
    LanguageCreatorFormModule,
    QueryProgressessModule,
    TranslateFormModule,
  ]
})
export class LanguageCreatorModule { }
