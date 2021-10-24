import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFooterComponent } from './main-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainFooterComponent,
  ],
  exports: [
    MainFooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class MainFooterModule { }
