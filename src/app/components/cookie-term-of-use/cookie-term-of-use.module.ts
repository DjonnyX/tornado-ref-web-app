import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieTermOfUseComponent } from './cookie-term-of-use.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CookieTermOfUseRoutingModule } from './cookie-term-of-use-routing.module';

@NgModule({
  declarations: [
    CookieTermOfUseComponent,
  ],
  exports: [
    CookieTermOfUseComponent,
  ],
  imports: [
    CommonModule,
    CookieTermOfUseRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CookieTermOfUseModule { }
