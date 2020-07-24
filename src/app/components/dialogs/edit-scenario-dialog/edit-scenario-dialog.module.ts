import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditScenarioDialogComponent } from './edit-scenario-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ScenarioEditorModule } from '@components/scenario-editor/scenario-editor.module';

@NgModule({
  declarations: [
    EditScenarioDialogComponent,
  ],
  exports: [
    EditScenarioDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ScenarioEditorModule,
  ]
})
export class EditScenarioDialogModule { }
