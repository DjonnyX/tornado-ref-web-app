import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService, IUserSigninRequest, IUserSignupRequest, IUserResetPasswordRequest, IUserForgotPasswordRequest } from "@services";
import { UserActions } from '@store/actions/user.action';
import { IAppState } from '@store/state';
import { Router } from '@angular/router';

@Injectable()
export default class UserEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>, private _router: Router) { }

  public readonly userSigninRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userSigninRequest),
      switchMap((params: IUserSigninRequest) => {
        return this._apiService.signin({
          email: params.email,
          password: params.password,
        }).pipe(
          mergeMap(user => {
            return [UserActions.userSigninSuccess({ user })];
          }),
          map(v => v),
          catchError((error: Error) => of(UserActions.userSigninError({ error: error.message })))
        );
      })
    )
  );

  public readonly userSignupRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userSignupRequest),
      switchMap((params: IUserSignupRequest) => {
        return this._apiService.signup({
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          password: params.password,
          confirmPassword: params.confirmPassword,
        }).pipe(
          mergeMap(user => {
            return [UserActions.userSignupSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => of(UserActions.userSignupError({ error: error.message })))
        );
      })
    )
  );

  public readonly userForgotPasswordRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userForgotPasswordRequest),
      switchMap((params: IUserForgotPasswordRequest) => {
        return this._apiService.forgotPassword({
          email: params.email,
        }).pipe(
          mergeMap(_ => {
            this._router.navigate(["forgot-password-result"]);
            return [UserActions.userForgotPasswordSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => of(UserActions.userForgotPasswordError({ error: error.message })))
        );
      })
    )
  );

  public readonly userResetPasswordRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userResetPasswordRequest),
      switchMap((params: IUserResetPasswordRequest) => {
        return this._apiService.resetPassword({
          password: params.password,
        }).pipe(
          mergeMap(_ => {
            return [UserActions.userResetPasswordSuccess()];
          }),
          map(v => v),
          catchError((error: Error) => of(UserActions.userResetPasswordError({ error: error.message })))
        );
      })
    )
  );
}
