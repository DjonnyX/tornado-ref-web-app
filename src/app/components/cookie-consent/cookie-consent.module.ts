import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentComponent } from './cookie-consent.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CookieConsentComponent,
  ],
  exports: [
    CookieConsentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ]
})
export class CookieConsentModule { }
