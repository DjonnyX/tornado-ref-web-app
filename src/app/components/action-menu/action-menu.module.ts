import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from '@components/base/select/select.module';
import { ActionMenuComponent } from './action-menu.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ActionMenuComponent,
  ],
  exports: [
    ActionMenuComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
  ]
})
export class ActionMenuModule { }
