import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUploaderComponent } from './asset-uploader.component';

@NgModule({
  declarations: [
    AssetUploaderComponent,
  ],
  exports: [
    AssetUploaderComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AssetUploaderModule { }
