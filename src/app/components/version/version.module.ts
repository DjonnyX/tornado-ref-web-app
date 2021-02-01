import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionComponent } from '../version/version.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    VersionComponent,
  ],
  exports: [
    VersionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class VersionModule { }
