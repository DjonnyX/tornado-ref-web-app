import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeListComponent } from './node-list.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NodeListFilterPipe } from './node-list-filter';

@NgModule({
  declarations: [
    NodeListComponent,
    NodeListFilterPipe,
  ],
  exports: [
    NodeListComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
  ]
})
export class NodeListModule { }
