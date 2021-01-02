import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordContainer } from './forgot-password.container';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ForgotPasswordContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    QueryProgressessModule,
    ForgotPasswordRoutingModule,
  ]
})
export class ForgotPasswordModule { }
