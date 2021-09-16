import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetEmailRoutingModule } from './reset-email-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResetEmailContainer } from './reset-email.container';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { ResetEmailVerifyTokenGuard } from './reset-email-verify-token.guard';

@NgModule({
  declarations: [
    ResetEmailContainer,
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
    QueryProgressessModule,
    ResetEmailRoutingModule,
  ],
  providers: [
    ResetEmailVerifyTokenGuard,
  ]
})
export class ResetEmailModule { }
