import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectorModule } from '../file-selector/file-selector.module';
import { MatButtonModule } from '@angular/material/button';
import { AssetsUploaderComponent } from './assets-uploader.component';

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
    MatButtonModule,
  ]
})
export class AssetsUploaderModule { }
