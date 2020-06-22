import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryProgressComponent } from './query-progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QueryProgressDirective } from './query-progress.directive';

@NgModule({
  declarations: [
    QueryProgressComponent,
    QueryProgressDirective,
  ],
  exports: [
    QueryProgressComponent,
    QueryProgressDirective,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ]
})
export class QueryProgressessModule { }
