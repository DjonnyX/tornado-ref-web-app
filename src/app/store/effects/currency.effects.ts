import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { CurrencyActions } from '@store/actions/currency.action';
import { formatCurrencyModel } from '@app/utils/currency.util';

@Injectable()
export default class CurrencyEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrencyActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getCurrency(id).pipe(
                    mergeMap(res => {
                        return [CurrencyActions.getSuccess({ currency: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(CurrencyActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrencyActions.createRequest),
            switchMap(({currency}) => {
                return this._apiService.createCurrency(formatCurrencyModel(currency)).pipe(
                    mergeMap(res => {
                        return [CurrencyActions.createSuccess({ currency: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(CurrencyActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CurrencyActions.updateRequest),
            switchMap(({ id, currency }) => {
                return this._apiService.updateCurrency(id, formatCurrencyModel(currency)).pipe(
                    mergeMap(res => {
                        return [CurrencyActions.updateSuccess({ currency: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(CurrencyActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
