import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUserProfile } from '@models';
import {
  IUserSigninRequest, IUserSigninResponse, IUserSignupRequest, IUserSignupResponse,
  IUserResetPasswordRequest, IUserResetPasswordResponse, IUserForgotPasswordRequest,
  IUserForgotPasswordResponse
} from './interfaces';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { UserSelectors } from '@store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _token: string;

  constructor(private _http: HttpClient, private _store: Store<IAppState>) {
    this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(profile => !!profile ? profile.token : undefined),
    ).subscribe(token => {
      this._token = token;
    })
  }

  public signin(params: IUserSigninRequest): Observable<IUserProfile> {
    return this._http
      .post<IUserSigninResponse>("api/v1/auth/signin", params)
      .pipe(
        map(res => res.data),
      );
  }

  public signup(params: IUserSignupRequest): Observable<{}> {
    return this._http
      .post<IUserSignupResponse>("api/v1/auth/signup", params)
      .pipe(
        map(res => res.data),
      );
  }

  public signout(): Observable<{}> {
    return this._http
      .post<any>("api/v1/auth/signout", {}, {
        headers: {
          authorization: this._token,
        },
      })
      .pipe(
        map(res => res.data),
      );
  }

  public forgotPassword(params: IUserForgotPasswordRequest): Observable<{}> {
    return this._http
      .post<IUserForgotPasswordResponse>("api/v1/auth/forgot-password", params)
      .pipe(
        map(res => res.data),
      );
  }

  public verifyResetPasswordToken(token: string): Observable<{}> {
    return this._http
      .post<IUserResetPasswordResponse>("api/v1/auth/verify-reset-password-token", { token })
      .pipe(
        map(res => res.data),
      );
  }

  public resetPassword(params: IUserResetPasswordRequest): Observable<{}> {
    return this._http
      .post<IUserResetPasswordResponse>("api/v1/auth/reset-password", params)
      .pipe(
        map(res => res.data),
      );
  }
}
