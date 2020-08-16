import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableComponent } from '../editable/editable.component';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';
import { EditOnEnterDirective } from './edit-on-enter.directive';

@NgModule({
  declarations: [
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    EditOnEnterDirective,
  ],
  exports: [
    EditableComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class EditableModule { }
