import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScenarioListComponent } from './scenario-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioEditorItemComponent } from '../item/scenario-editor-item.component';

@NgModule({
  declarations: [
    ScenarioListComponent,
    ScenarioEditorItemComponent,
  ],
  exports: [
    ScenarioListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ScenarioEditorModule { }
