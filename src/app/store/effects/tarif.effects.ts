import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TarifActions } from '@store/actions/tarif.action';
import { formatTarifModel } from '@app/utils/tarif.util';

@Injectable()
export default class TarifEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TarifActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getTarif(id).pipe(
                    mergeMap(res => {
                        return [TarifActions.getSuccess({ tarif: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(TarifActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TarifActions.createRequest),
            switchMap(({ tarif }) => {
                return this._apiService.createTarif(formatTarifModel(tarif)).pipe(
                    mergeMap(res => {
                        return [TarifActions.createSuccess({ tarif: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(TarifActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TarifActions.updateRequest),
            switchMap(({ id, tarif }) => {
                return this._apiService.updateTarif(id, formatTarifModel(tarif)).pipe(
                    mergeMap(res => {
                        return [TarifActions.updateSuccess({ tarif: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(TarifActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
