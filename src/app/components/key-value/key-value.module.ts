import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValueComponent } from './key-value.component';

@NgModule({
  declarations: [
    KeyValueComponent,
  ],
  exports: [
    KeyValueComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class KeyValueModule { }
