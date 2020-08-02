import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScenarioListComponent } from './scenario-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioListItemComponent } from '../item/scenario-list-item.component';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
  ]
})
export class ScenarioListModule { }
