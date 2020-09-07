import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpressionEditorComponent } from './expression-editor.component';

@NgModule({
  declarations: [
    ExpressionEditorComponent,
  ],
  exports: [
    ExpressionEditorComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ExpressionEditorModule { }
