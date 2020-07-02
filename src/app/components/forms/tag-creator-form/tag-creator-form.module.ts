import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagCreatorFormComponent } from './tag-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TagCreatorFormComponent,
  ],
  exports: [
    TagCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class TagCreatorFormModule { }
