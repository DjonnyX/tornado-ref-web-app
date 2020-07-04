import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeTreeComponent } from './node-tree.component';
import { NodeTreeItemModule } from '@components/node-tree-item/node-tree-item.module';
import { StatePanelModule } from '@components/state-panel/state-panel.module';

@NgModule({
  declarations: [
    NodeTreeComponent,
  ],
  exports: [
    NodeTreeComponent,
  ],
  imports: [
    CommonModule,
    NodeTreeItemModule,
    StatePanelModule,
  ]
})
export class NodeTreeModule { }
