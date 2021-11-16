import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { WeightUnitsActions } from '@store/actions/weight-units.action';
import { formatWeightUnitModel } from '@app/utils/weight-unit.util';

@Injectable()
export default class WeightUnitsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getWeightUnits(options).pipe(
                    mergeMap(res => {
                        return [WeightUnitsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitsActions.createRequest),
            switchMap(({ weightunit }) => {
                return this._apiService.createWeightUnit(formatWeightUnitModel(weightunit)).pipe(
                    mergeMap(res => {
                        return [WeightUnitsActions.createSuccess({ weightunit: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitsActions.updateRequest),
            switchMap(({ id, weightunit }) => {
                return this._apiService.updateWeightUnit(id, formatWeightUnitModel(weightunit)).pipe(
                    mergeMap(res => {
                        return [WeightUnitsActions.updateSuccess({ weightunit: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteWeightUnit(id).pipe(
                    mergeMap(res => {
                        return [WeightUnitsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
