import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountComponent } from './count.component';

@NgModule({
  declarations: [
    CountComponent
  ],
  exports: [
    CountComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class CountModule { }
