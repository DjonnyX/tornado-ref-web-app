import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalOrderPickerConfigComponent } from './terminal-order-picker-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    TerminalOrderPickerConfigComponent,
  ],
  exports: [
    TerminalOrderPickerConfigComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class TerminalOrderPickerConfigModule { }
