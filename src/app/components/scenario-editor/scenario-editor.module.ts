import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioEditorComponent } from './scenario-editor.component';

@NgModule({
  declarations: [
    ScenarioEditorComponent,
  ],
  exports: [
    ScenarioEditorComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ScenarioEditorModule { }
