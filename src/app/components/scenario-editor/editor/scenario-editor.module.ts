import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScenarioEditorComponent } from './scenario-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioEditorItemComponent } from '../item/scenario-editor-item.component';

@NgModule({
  declarations: [
    ScenarioEditorComponent,
    ScenarioEditorItemComponent,
  ],
  exports: [
    ScenarioEditorComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ScenarioEditorModule { }
