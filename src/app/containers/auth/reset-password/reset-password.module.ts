import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ResetPasswordContainer } from './reset-password.container';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { ResetPasswordVerifyTokenGuard } from './reset-password-verify-token.guard';

@NgModule({
  declarations: [
    ResetPasswordContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    QueryProgressessModule,
    ResetPasswordRoutingModule,
  ],
  providers: [
    ResetPasswordVerifyTokenGuard,
  ]
})
export class ResetPasswordModule { }
