import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldModule } from '@components/search-field/search-field.module';
import { StatePanelComponent } from './state-panel.component';

@NgModule({
  declarations: [
    StatePanelComponent,
  ],
  exports: [
    StatePanelComponent,
  ],
  imports: [
    CommonModule,
    SearchFieldModule,
  ]
})
export class StatePanelModule { }
