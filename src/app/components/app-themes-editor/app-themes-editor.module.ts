import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemesEditorComponent } from './app-themes-editor.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { SearchPipeModule } from '@app/pipes/seach/search-pipe.module';
import { StatePanelModule } from '@components/state-panel/state-panel.module';
import { TapEffectModule } from '@app/directives/tap-effect/tap-effect.module';
import { CheckboxModule } from '@components/base/checkbox/checkbox.module';

@NgModule({
  declarations: [
    AppThemesEditorComponent,
  ],
  exports: [
    AppThemesEditorComponent,
  ],
  imports: [
    CommonModule,
    TapEffectModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    DeleteEntityDialogModule,
    StatePanelModule,
    CheckboxModule,
    SearchPipeModule,
  ]
})
export class AppThemesEditorComponentModule { }
