import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Type } from '@angular/core';
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
import { LocalizationModule } from './services/localization/localization.module';
import LOCALIZATION from './localization';
import { EmptyPageModule } from '@components/empty-page/empty-page.module';

const imports: Array<(any[] | Type<any> | ModuleWithProviders<{}>)> = [
  BrowserModule,
  EmptyPageModule,
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
  LocalizationModule.forRoot(LOCALIZATION),
];

if (["all", "cms"].indexOf(environment.buildType) > -1) {
  imports.push(
    CookieConsentModule,
  );
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor,
      multi: true,
    },
    NotificationService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
