import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsEditorComponent } from './assets-editor.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { SearchPipeModule } from '@app/pipes/seach/search-pipe.module';
import { StatePanelModule } from '@components/state-panel/state-panel.module';

@NgModule({
  declarations: [
    AssetsEditorComponent,
  ],
  exports: [
    AssetsEditorComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    DeleteEntityDialogModule,
    StatePanelModule,
    SearchPipeModule,
  ]
})
export class AssetsEditorComponentModule { }
