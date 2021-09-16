import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmailContainer } from './change-email.container';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { ChangeEmailRoutingModule } from './change-email-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ChangeEmailContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    QueryProgressessModule,
    ChangeEmailRoutingModule,
  ]
})
export class ChangeEmailModule { }
