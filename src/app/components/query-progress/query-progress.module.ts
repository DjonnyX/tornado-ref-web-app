import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryProgressComponent } from './query-progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    QueryProgressComponent,
  ],
  exports: [
    QueryProgressComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ]
})
export class QueryProgressessModule { }
