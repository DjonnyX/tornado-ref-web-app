import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioEditorComponent } from './scenario-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ScenarioEditorComponent,
  ],
  exports: [
    ScenarioEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class ScenarioEditorModule { }
