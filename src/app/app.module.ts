import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from '@environments';

import rootReducer, { metaReducers } from '@store/reducers';
import rootEffect from '@store/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import {
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { CookieConsentModule } from '@components/cookie-consent/cookie-consent.module';
import { EmptyPageComponent } from '@components/empty-page/empty-page.component';
import { LocalizationModule } from './services/localization/localization.module';
import LOCALIZATION from './localization';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    EmptyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      rootReducer,
      { metaReducers }
    ),
    EffectsModule.forRoot(rootEffect),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    QueryProgressessModule,
    MatSnackBarModule,
    CookieConsentModule,
    LocalizationModule.forRoot(LOCALIZATION),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor,
      multi: true,
    },
    NotificationService,
    ThemeService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
