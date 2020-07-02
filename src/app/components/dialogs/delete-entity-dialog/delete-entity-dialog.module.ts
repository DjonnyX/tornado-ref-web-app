import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteEntityDialogComponent } from './delete-entity-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DeleteEntityDialogComponent,
  ],
  exports: [
    DeleteEntityDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class DeleteEntityDialogModule { }
