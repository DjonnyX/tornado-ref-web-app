import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  declarations: [
    ExpansionPanelComponent,
  ],
  exports: [
    ExpansionPanelComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ExpansionPanelModule { }
