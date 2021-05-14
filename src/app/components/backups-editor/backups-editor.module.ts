import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupsEditorComponent } from './backups-editor.component';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderButtonModule } from '@components/loader-button/loader-button.module';
import { FileSelectorModule } from '@components/assets/file-selector/file-selector.module';
import { FileDownloaderModule } from '@components/file-downloader/file-downloader.module';

@NgModule({
  declarations: [
    BackupsEditorComponent,
  ],
  exports: [
    BackupsEditorComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    LoaderButtonModule,
    FileSelectorModule,
    FileDownloaderModule,
  ]
})
export class BackupsEditorModule { }
