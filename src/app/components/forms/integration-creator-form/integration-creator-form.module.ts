import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationCreatorFormComponent } from './integration-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { VersionModule } from '@components/version/version.module';

@NgModule({
  declarations: [
    IntegrationCreatorFormComponent,
  ],
  exports: [
    IntegrationCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    VersionModule,
  ]
})
export class IntegrationCreatorFormModule { }
