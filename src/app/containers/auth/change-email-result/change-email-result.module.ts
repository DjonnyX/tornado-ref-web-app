import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEmailResultRoutingModule } from './change-email-routing.module';
import { ChangeEmailResultCotainer } from './change-email-result.container';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ChangeEmailResultCotainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ChangeEmailResultRoutingModule,
  ]
})
export class ChangeEmailResultModule { }
