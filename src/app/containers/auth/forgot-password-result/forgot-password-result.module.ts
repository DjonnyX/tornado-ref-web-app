import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ForgotPasswordResultRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordResultCotainer } from './forgot-password-result.container';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ForgotPasswordResultCotainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    ForgotPasswordResultRoutingModule,
  ]
})
export class ForgotPasswordResultModule { }
