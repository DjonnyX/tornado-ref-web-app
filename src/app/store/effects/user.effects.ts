import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService, IUserSigninRequest, IUserSignupRequest, IUserResetPasswordRequest, IUserForgotPasswordRequest, IUserSignupParamsRequest, IUserChangeEmailRequest, IUserResetEmailRequest } from "@services";
import { UserActions } from '@store/actions/user.action';
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { IAccount } from "@djonnyx/tornado-types";

@Injectable()
export default class UserEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
    private _router: Router, private _notificationService: NotificationService) { }

  public readonly userSigninRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userSigninRequest),
      switchMap((params: IUserSigninRequest) => {
        return this._apiService.signin({
          email: params.email,
          password: params.password,
        }).pipe(
          mergeMap(profile => {
            return [UserActions.userSigninSuccess({ profile })];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userSigninError({ error: error.message }));
          }),
        );
      })
    )
  );

  public readonly userSignupParamsRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userSignupParamsRequest),
      switchMap((params: IUserSignupParamsRequest) => {
        return this._apiService.signupParams().pipe(
          mergeMap(({ captcha }) => {
            return [UserActions.userSignupParamsSuccess({ captcha })];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userSignupParamsError({ error: error.message }))
          }),
        );
      })
    )
  );

  public readonly userSignupRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userSignupRequest),
      switchMap((params: IUserSignupRequest) => {
        return this._apiService.signup({
          integrationId: params.integrationId,
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          password: params.password,
          captchaId: params.captchaId,
          captchaValue: params.captchaValue,
        }).pipe(
          mergeMap(user => {
            this._router.navigate(["signin"]);
            this._notificationService.success("Registration confirmed.");
            return [UserActions.userSignupSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userSignupError({ error: error.message }))
          }),
        );
      })
    )
  );

  public readonly signoutRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.signoutRequest),
      switchMap(_ => {
        return [UserActions.clearProfile(), UserActions.signoutSuccess()];
      })
    )
  );

  public readonly userForgotPasswordRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userForgotPasswordRequest),
      switchMap(({ params, fromProfile }) => {
        return this._apiService.forgotPassword({
          email: params.email,
          captchaId: params.captchaId,
          captchaVal: params.captchaVal,
          language: params.language,
        }).pipe(
          mergeMap(_ => {
            this._router.navigate(["forgot-password-result"], { queryParams: { fromProfile }, queryParamsHandling: 'merge' });
            return [UserActions.userForgotPasswordSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userForgotPasswordError({ error: error.message }))
          }),
        );
      })
    )
  );

  public readonly userResetPasswordRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userResetPasswordRequest),
      switchMap((params: IUserResetPasswordRequest) => {
        return this._apiService.resetPassword({
          restorePassCode: params.restorePassCode,
          password: params.password,
        }).pipe(
          mergeMap(_ => {
            this._router.navigate(["reset-password-result"]);
            return [UserActions.userResetPasswordSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userResetPasswordError({ error: error.message }))
          }),
        );
      })
    )
  );

  public readonly userUpdateProfileRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userUpdateProfileRequest),
      switchMap(({ params, callback }) => {
        return this._apiService.updateAccount(params?.id, params?.data).pipe(
          mergeMap(({ data }) => {
            callback(null, data);
            return [UserActions.userUpdateProfileSuccess({ account: data })];
          }),
          map(v => v),
          catchError((error: Error) => {
            callback(error);
            return of(UserActions.userUpdateProfileError({ error: error.message }))
          }),
        );
      })
    )
  );

  public readonly userChangeEmailRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userChangeEmailRequest),
      switchMap(data => {
        return this._apiService.changeEmail(data).pipe(
          mergeMap(_ => {
            this._router.navigate(["change-email-result"]);
            return [UserActions.userChangeEmailSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userChangeEmailError({ error: error.message }))
          }),
        );
      })
    )
  );

  public readonly userResetEmailRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userResetEmailRequest),
      switchMap((params: IUserResetEmailRequest) => {
        return this._apiService.resetEmail({
          restoreEmailCode: params.restoreEmailCode,
          email: params.email,
        }).pipe(
          mergeMap(_ => {
            this._router.navigate(["reset-email-result"]);
            return [UserActions.userResetEmailSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => {
            return of(UserActions.userResetEmailError({ error: error.message }))
          }),
        );
      })
    )
  );
}
