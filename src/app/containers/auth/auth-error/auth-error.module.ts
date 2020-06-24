import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthErrorContainer } from './auth-error.container';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AuthErrorRoutingModule } from './auth-error-routing.module';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
    AuthErrorRoutingModule,
  ]
})
export class AuthErrorModule { }
