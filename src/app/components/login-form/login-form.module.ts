import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BusyIndicatorModule } from '@components/busy-indicator/busy-indicator.module';
import { BusyDirective } from '@directives';

@NgModule({
  declarations: [
    BusyDirective,
    LoginFormComponent,
  ],
  exports: [
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BusyIndicatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
  ]
})
export class LoginFormModule { }
