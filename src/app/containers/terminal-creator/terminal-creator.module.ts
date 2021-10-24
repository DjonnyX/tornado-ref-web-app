import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalCreatorContainer } from './terminal-creator.container';
import { TerminalCreatorFormModule } from '@components/forms/terminal-creator-form/terminal-creator-form.module';
import { TerminalCreatorRoutingModule } from './terminal-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    TerminalCreatorContainer,
  ],
  imports: [
    CommonModule,
    TerminalCreatorRoutingModule,
    TerminalCreatorFormModule,
    QueryProgressessModule,
    MainFooterModule,
  ]
})
export class TerminalCreatorModule { }
