import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainer } from '../login/login.container';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFormModule } from '@components/login-form/login-form.module';

@NgModule({
  declarations: [
    LoginContainer,
  ],
  imports: [
    CommonModule,
    LoginFormModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
