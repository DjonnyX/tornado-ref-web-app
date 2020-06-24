import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthErrorContainer } from './auth-error.container';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AuthErrorRoutingModule } from './auth-error-routing.module';

@NgModule({
  declarations: [
    AuthErrorContainer
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    AuthErrorRoutingModule,
  ]
})
export class AuthErrorModule { }
