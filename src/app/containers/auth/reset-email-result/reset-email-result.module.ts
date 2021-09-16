import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetEmailResultContainer } from './reset-email-result.container';
import { ResetEmailResultRoutingModule } from './reset-email-result-routing.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ResetEmailResultContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ResetEmailResultRoutingModule,
  ]
})
export class ResetEmailResultModule { }