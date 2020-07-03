import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsEditorComponent } from './tags-editor.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { SearchFieldModule } from '@components/search-field/search-field.module';
import { SearchPipeModule } from '@app/pipes/seach/search-pipe.module';

@NgModule({
  declarations: [
    TagsEditorComponent,
  ],
  exports: [
    TagsEditorComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    DeleteEntityDialogModule,
    SearchFieldModule,
    SearchPipeModule,
  ]
})
export class TagsEditorComponentModule { }
