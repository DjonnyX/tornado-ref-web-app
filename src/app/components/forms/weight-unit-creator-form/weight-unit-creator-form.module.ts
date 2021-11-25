import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitCreatorFormComponent } from './weight-unit-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { WeightUnitContentModule } from './weight-unit-content/weight-unit-content.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';

@NgModule({
  declarations: [
    WeightUnitCreatorFormComponent,
  ],
  exports: [
    WeightUnitCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    DeleteEntityDialogModule,
    WeightUnitContentModule,
  ]
})
export class WeightUnitCreatorFormModule { }
