import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AccountsActions } from '@store/actions/accounts.action';
import { formatAccountModel } from '@app/utils/account.util';

@Injectable()
export default class AccountsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getAccounts(options).pipe(
                    mergeMap(res => {
                        return [AccountsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AccountsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountsActions.createRequest),
            switchMap(({ data, options }) => {
                return this._apiService.signup({
                    integrationId: data.integrationId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    captchaId: data.captchaId,
                    captchaValue: data.captchaValue,
                }).pipe(
                    mergeMap(({ client }) => {
                        this._router.navigate(["signin"]);
                        this._notificationService.success("Registration confirmed.");
                        return this._apiService.getAccount(client).pipe(
                            mergeMap(({ data }) => {
                                return [AccountsActions.createSuccess({ account: data })];
                            }),
                        );
                    }),
                    catchError((error: Error) => {
                        return of(AccountsActions.createError({ error: error.message }))
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountsActions.updateRequest),
            switchMap(({ id, account }) => {
                return this._apiService.updateAccount(id, formatAccountModel(account)).pipe(
                    mergeMap(res => {
                        return [AccountsActions.updateSuccess({ account: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AccountsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteAccount(id).pipe(
                    mergeMap(res => {
                        return [AccountsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AccountsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
