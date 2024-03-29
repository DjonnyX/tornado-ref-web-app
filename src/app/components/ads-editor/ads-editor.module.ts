import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsEditorComponent } from './ads-editor.component';
import { MatRippleModule } from '@angular/material/core';
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

@NgModule({
  declarations: [
    AdsEditorComponent,
  ],
  exports: [
    AdsEditorComponent,
  ],
  imports: [
    CommonModule,
    TapEffectModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    CheckboxModule,
    DeleteEntityDialogModule,
    StatePanelModule,
    SearchPipeModule,
  ]
})
export class AdsEditorComponentModule { }
