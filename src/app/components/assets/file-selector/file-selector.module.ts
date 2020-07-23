import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectorComponent } from './file-selector.component';

@NgModule({
  declarations: [
    FileSelectorComponent,
  ],
  exports: [
    FileSelectorComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class FileSelectorModule { }
