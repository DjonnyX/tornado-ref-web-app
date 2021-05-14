import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupsContainer } from './backups.container';
import { BackupsEditorModule } from '@components/backups-editor/backups-editor.module';
import { BackupsRoutingModule } from './backups-routing.module';

@NgModule({
  declarations: [
    BackupsContainer,
  ],
  imports: [
    CommonModule,
    BackupsRoutingModule,
    BackupsEditorModule,
  ]
})
export class BackupsModule { }
