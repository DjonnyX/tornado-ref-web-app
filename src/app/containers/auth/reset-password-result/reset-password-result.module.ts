import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordResultContainer } from './reset-password-result.container';
import { ResetPasswordResultRoutingModule } from './reset-password-result-routing.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ResetPasswordResultContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ResetPasswordResultRoutingModule,
  ]
})
export class ResetPasswordResultModule { }
