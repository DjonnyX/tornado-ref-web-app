import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectorModule } from '../file-selector/file-selector.module';
import { MatButtonModule } from '@angular/material/button';
import { AssetsUploaderComponent } from './assets-uploader.component';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatProgressBarModule,
  ]
})
export class AssetsUploaderModule { }
