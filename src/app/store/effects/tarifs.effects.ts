import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TarifsActions } from '@store/actions/tarifs.action';
import { formatTarifModel } from '@app/utils/tarif.util';

@Injectable()
export default class TarifsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TarifsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getTarifs(options).pipe(
                    mergeMap(res => {
                        return [TarifsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(TarifsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TarifsActions.updateRequest),
            switchMap(({ id, tarif }) => {
                return this._apiService.updateTarif(id, formatTarifModel(tarif)).pipe(
                    mergeMap(res => {
                        return [TarifsActions.updateSuccess({ tarif: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(TarifsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TarifsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteTarif(id).pipe(
                    mergeMap(res => {
                        return [TarifsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(TarifsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
