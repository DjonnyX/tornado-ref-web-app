import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateFormComponent } from './translate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FocusableDirective } from '@app/directives/focusable.directive';
import { EditableModule } from '@components/base/editable/editable.module';

@NgModule({
  declarations: [
    TranslateFormComponent,
    FocusableDirective,
  ],
  exports: [
    TranslateFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    EditableModule,
  ]
})
export class TranslateFormModule { }
