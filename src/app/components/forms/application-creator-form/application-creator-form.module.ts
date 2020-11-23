import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationCreatorFormComponent } from './application-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ApplicationCreatorFormComponent,
  ],
  exports: [
    ApplicationCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class ApplicationCreatorFormModule { }
