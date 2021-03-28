import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalCreatorFormComponent } from './terminal-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { TerminalKioskConfigModule } from '@components/terminal/config/terminal-kiosk-config/terminal-kiosk-config.module';
import { TerminalOrderPickerConfigModule } from '@components/terminal/config/terminal-order-picker-config/terminal-order-picker-config.module';
import { TerminalEQConfigModule } from '@components/terminal/config/terminal-eq-config/terminal-eq-config.module';

@NgModule({
  declarations: [
    TerminalCreatorFormComponent,
  ],
  exports: [
    TerminalCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    KeyValueModule,
    TerminalKioskConfigModule,
    TerminalOrderPickerConfigModule,
    TerminalEQConfigModule,
  ]
})
export class TerminalCreatorFormModule { }
