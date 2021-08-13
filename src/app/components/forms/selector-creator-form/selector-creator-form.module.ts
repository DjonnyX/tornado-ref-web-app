import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCreatorFormComponent } from './selector-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SelectorContentModule } from './selector-content/selector-content.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    SelectorCreatorFormComponent,
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
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    DeleteEntityDialogModule,
    SelectorContentModule,
    KeyValueModule,
  ]
})
export class SelectorCreatorFormModule { }
