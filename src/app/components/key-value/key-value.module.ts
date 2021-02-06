import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValueComponent } from './key-value.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    KeyValueComponent,
  ],
  exports: [
    KeyValueComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class KeyValueModule { }
