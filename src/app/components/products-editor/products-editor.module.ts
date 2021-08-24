import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterProductsPipe, ProductsEditorComponent, SortProductsPipe } from './products-editor.component';
// import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { SearchPipeModule } from '@app/pipes/seach/search-pipe.module';
import { StatePanelModule } from '@components/state-panel/state-panel.module';
import { CheckboxModule } from '@components/base/checkbox/checkbox.module';
import { TapEffectModule } from '@app/directives/tap-effect/tap-effect.module';
import { ActionMenuModule } from '@components/action-menu/action-menu.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ProductsEditorComponent,
    FilterProductsPipe,
    SortProductsPipe,
  ],
  exports: [
    ProductsEditorComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    CheckboxModule,
    DeleteEntityDialogModule,
    StatePanelModule,
    SearchPipeModule,
    TapEffectModule,
    ActionMenuModule,
    DragDropModule,
  ]
})
export class ProductsEditorComponentModule { }
