import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectContentFormComponent } from './select-content-form.component';
import { EntityListModule } from '@components/entity-list/entity-list.module';
import { NodeListModule } from '@components/node-list/node-list.module';

@NgModule({
  declarations: [
    SelectContentFormComponent,
  ],
  exports: [
    SelectContentFormComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    EntityListModule,
    NodeListModule,
  ]
})
export class SelectContentFormModule { }
