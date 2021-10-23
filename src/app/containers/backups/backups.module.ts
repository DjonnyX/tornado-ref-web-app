import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupsContainer } from './backups.container';
import { BackupsEditorModule } from '@components/backups-editor/backups-editor.module';
import { BackupsRoutingModule } from './backups-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    BackupsContainer,
  ],
  imports: [
    CommonModule,
    BackupsRoutingModule,
    BackupsEditorModule,
    QueryProgressessModule,
  ]
})
export class BackupsModule { }
