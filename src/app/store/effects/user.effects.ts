import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService, IUserAuthRequest } from "@services";
import { UserActions } from '@store/actions/user.action';
import { IAppState } from '@store/state';

@Injectable()
export default class UserEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>) { }

  public readonly userAuthRequest = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.userAuthRequest),
      switchMap((params: IUserAuthRequest) => {
        return this._apiService.auth(params).pipe(
          mergeMap(user => {
            return [UserActions.userAuthSuccess({ user })];
          }),
          map(v => v),
          catchError(error => of(UserActions.userAuthError({ error })))
        );
      })
    )
  );
}
