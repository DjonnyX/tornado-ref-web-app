import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordResultContainer } from './reset-password-result.container';
import { ResetPasswordResultRoutingModule } from './reset-password-result-routing.module';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ResetPasswordResultContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatButtonModule,
    ResetPasswordResultRoutingModule,
  ]
})
export class ResetPasswordResultModule { }
