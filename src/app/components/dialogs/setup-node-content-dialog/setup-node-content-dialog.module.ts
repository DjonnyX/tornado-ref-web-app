import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupNodeContentDialogComponent } from './setup-node-content-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectContentFormModule } from '@components/forms/select-content-form/select-content-form.module';

@NgModule({
  declarations: [
    SetupNodeContentDialogComponent,
  ],
  exports: [
    SetupNodeContentDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    SelectContentFormModule,
  ]
})
export class SetupNodeContentDialogModule { }
