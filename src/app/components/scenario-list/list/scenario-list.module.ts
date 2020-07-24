import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScenarioListComponent } from './scenario-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioListItemComponent } from '../item/scenario-list-item.component';

@NgModule({
  declarations: [
    ScenarioListComponent,
    ScenarioListItemComponent,
  ],
  exports: [
    ScenarioListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ScenarioListModule { }
