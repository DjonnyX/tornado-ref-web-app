import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectorModule } from '../file-selector/file-selector.module';
import { MatButtonModule } from '@angular/material/button';
import { AssetsUploaderComponent } from './assets-uploader.component';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';

@NgModule({
  declarations: [
    AssetsUploaderComponent,
  ],
  exports: [
    AssetsUploaderComponent,
  ],
  imports: [
    CommonModule,
    FileSelectorModule,
    MatRippleModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    DeleteEntityDialogModule,
  ]
})
export class AssetsUploaderModule { }
