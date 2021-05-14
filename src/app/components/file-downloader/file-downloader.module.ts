import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDownloaderComponent } from './file-downloader.component';

@NgModule({
  declarations: [
    FileDownloaderComponent,
  ],
  exports: [
    FileDownloaderComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class FileDownloaderModule { }
