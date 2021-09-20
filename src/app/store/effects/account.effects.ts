import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AccountActions } from '@store/actions/account.action';
import { formatAccountModel } from '@app/utils/account.util';

@Injectable()
export default class AccountEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getAccount(id).pipe(
                    mergeMap(res => {
                        return [AccountActions.getSuccess({ account: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AccountActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountActions.createRequest),
            switchMap(({ data, options }) => {
                return this._apiService.createAccount({
                    roleType: data.roleType,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    captchaId: data.captchaId,
                    captchaValue: data.captchaValue,
                }).pipe(
                    mergeMap(account => {
                        this._notificationService.success("Registration confirmed.");
                        return [AccountActions.createSuccess({ account })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AccountActions.createError({ error: error.message }))
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountActions.updateRequest),
            switchMap(({ id, account }) => {
                return this._apiService.updateAccount(id, formatAccountModel(account)).pipe(
                    mergeMap(res => {
                        return [AccountActions.updateSuccess({ account: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AccountActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteAccount(id).pipe(
                    mergeMap(res => {
                        return [AccountActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AccountActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
