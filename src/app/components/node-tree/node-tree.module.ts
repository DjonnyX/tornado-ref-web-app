import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeTreeComponent } from './node-tree.component';
import { NodeTreeItemModule } from '@components/node-tree-item/node-tree-item.module';
import { StatePanelModule } from '@components/state-panel/state-panel.module';
import { TabListModule } from '@components/tab-list/tab-list.module';

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
    TabListModule,
  ]
})
export class NodeTreeModule { }
