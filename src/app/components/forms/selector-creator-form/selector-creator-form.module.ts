import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCreatorFormComponent } from './selector-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SelectorContentComponent } from './selector-content/selector-content.component';
import { SelectorContentModule } from './selector-content/selector-content.module';

@NgModule({
  declarations: [
    SelectorCreatorFormComponent,
    SelectorContentComponent,
  ],
  exports: [
    SelectorCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    SelectorContentModule,
  ]
})
export class SelectorCreatorFormModule { }
