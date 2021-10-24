import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackupsContainer } from './backups.container';
import { BackupsEditorModule } from '@components/backups-editor/backups-editor.module';
import { BackupsRoutingModule } from './backups-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    BackupsContainer,
  ],
  imports: [
    CommonModule,
    BackupsRoutingModule,
    BackupsEditorModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class BackupsModule { }
