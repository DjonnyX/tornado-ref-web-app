import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageCreatorFormComponent } from './language-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LanguageContentModule } from './language-content/language-content.module';

@NgModule({
  declarations: [
    LanguageCreatorFormComponent,
  ],
  exports: [
    LanguageCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    LanguageContentModule,
  ]
})
export class LanguageCreatorFormModule { }
