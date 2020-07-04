import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeTreeItemComponent } from './node-tree-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NodeTreeItemComponent,
  ],
  exports: [
    NodeTreeItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatDialogModule,
  ]
})
export class NodeTreeItemModule { }
