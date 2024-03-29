import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioEditorComponent } from './scenario-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExpressionEditorModule } from '../expression-editor/expression-editor.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatCheckboxModule,
    MatFormFieldModule,
    ExpressionEditorModule,
  ]
})
export class ScenarioEditorModule { }
