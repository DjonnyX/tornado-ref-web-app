import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagCreatorFormComponent } from './tag-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TagContentModule } from './tag-content/tag-content.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';

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
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    DeleteEntityDialogModule,
    TagContentModule,
  ]
})
export class TagCreatorFormModule { }
