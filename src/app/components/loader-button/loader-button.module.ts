import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderButtonComponent } from './loader-button.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LoaderButtonComponent,
  ],
  exports: [
    LoaderButtonComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
  ]
})
export class LoaderButtonModule { }
