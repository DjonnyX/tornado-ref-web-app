import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentComponent } from './cookie-consent.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CookieConsentComponent,
  ],
  exports: [
    CookieConsentComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class CookieConsentModule { }
