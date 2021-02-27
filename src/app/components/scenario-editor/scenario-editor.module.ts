import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScenarioListModule } from '@components/scenario-list/list/scenario-list.module';
import { EditScenarioDialogModule } from '@components/dialogs/edit-scenario-dialog/edit-scenario-dialog.module';
import { ScenarioEditorComponent } from '@components/forms/scenario/scenario-editor/scenario-editor.component';

@NgModule({
  declarations: [
    ScenarioEditorComponent,
  ],
  exports: [
    ScenarioEditorComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    ScenarioListModule,
    EditScenarioDialogModule,
  ]
})
export class ScenarioEditorModule { }
