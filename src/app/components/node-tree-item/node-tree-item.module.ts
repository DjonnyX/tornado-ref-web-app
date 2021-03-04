import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeTreeItemComponent } from './node-tree-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SetupNodeContentDialogModule } from '@components/dialogs/setup-node-content-dialog/setup-node-content-dialog.module';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { ScenarioListModule } from '@components/scenario-list/list/scenario-list.module';
import { EditScenarioDialogModule } from '@components/dialogs/edit-scenario-dialog/edit-scenario-dialog.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NodeTreeItemComponent,
  ],
  exports: [
    NodeTreeItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    DeleteEntityDialogModule,
    SetupNodeContentDialogModule,
    ScenarioListModule,
    EditScenarioDialogModule,
  ]
})
export class NodeTreeItemModule { }
