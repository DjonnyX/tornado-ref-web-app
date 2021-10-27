import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifCreatorFormComponent } from './tarif-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { VersionModule } from '@components/version/version.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TarifCreatorFormComponent,
  ],
  exports: [
    TarifCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    VersionModule,
  ]
})
export class TarifCreatorFormModule { }
