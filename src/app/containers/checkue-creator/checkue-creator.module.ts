import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckueCreatorContainer } from './checkue-creator.container';
import { CheckueCreatorFormModule } from '@components/forms/checkue-creator-form/checkue-creator-form.module';
import { CheckueCreatorRoutingModule } from './checkue-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { ScenarioEntityEditorModule } from '@components/scenario-entity-editor/scenario-entity-editor.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    CheckueCreatorContainer,
  ],
  imports: [
    CommonModule,
    CheckueCreatorRoutingModule,
    CheckueCreatorFormModule,
    QueryProgressessModule,
    ScenarioEntityEditorModule,
    MainFooterModule,
  ]
})
export class CheckueCreatorModule { }
