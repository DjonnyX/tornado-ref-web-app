import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckueCreatorFormComponent } from './checkue-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { KeyValueModule } from '@components/key-value/key-value.module';

@NgModule({
  declarations: [
    CheckueCreatorFormComponent,
  ],
  exports: [
    CheckueCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    KeyValueModule,
  ]
})
export class CheckueCreatorFormModule { }
