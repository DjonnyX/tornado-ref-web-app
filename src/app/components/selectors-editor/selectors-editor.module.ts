import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorsEditorComponent } from './selectors-editor.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';

@NgModule({
  declarations: [
    SelectorsEditorComponent,
  ],
  exports: [
    SelectorsEditorComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    DeleteEntityDialogModule,
  ]
})
export class SelectorsEditorComponentModule { }
