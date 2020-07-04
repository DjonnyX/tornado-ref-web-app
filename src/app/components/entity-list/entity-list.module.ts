import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    EntityListComponent,
  ],
  exports: [
    EntityListComponent,
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
  ]
})
export class EntityListModule { }
