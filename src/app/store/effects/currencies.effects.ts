import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { formatCurrencyModel } from '@app/utils/currency.util';

@Injectable()
export default class CurrenciesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrenciesActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getCurrencies(options).pipe(
                    mergeMap(res => {
                        return [CurrenciesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CurrenciesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrenciesActions.createRequest),
            switchMap(({ currency }) => {
                return this._apiService.createCurrency(formatCurrencyModel(currency)).pipe(
                    mergeMap(res => {
                        return [CurrenciesActions.createSuccess({ currency: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CurrenciesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrenciesActions.updateRequest),
            switchMap(({ id, currency, setDafault }) => {
                return this._apiService.updateCurrency(id, formatCurrencyModel(currency)).pipe(
                    mergeMap(res => {
                        if (setDafault) {
                            this._store.dispatch(CurrenciesActions.getAllRequest());
                            return [CurrenciesActions.updateSuccess({ currency: res.data, meta: res.meta })];
                        }
                        return [CurrenciesActions.updateSuccess({ currency: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CurrenciesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrenciesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteCurrency(id).pipe(
                    mergeMap(res => {
                        return [CurrenciesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CurrenciesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
