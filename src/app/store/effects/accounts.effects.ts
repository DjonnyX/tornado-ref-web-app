import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
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
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AccountsActions.getAllError({ error: error.message }));
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
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AccountsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
