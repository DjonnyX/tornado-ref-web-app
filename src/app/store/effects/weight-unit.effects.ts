import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { WeightUnitActions } from '@store/actions/weight-unit.action';
import { formatWeightUnitModel } from '@app/utils/weight-unit.util';

@Injectable()
export default class WeightUnitEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getWeightUnit(id).pipe(
                    mergeMap(res => {
                        return [WeightUnitActions.getSuccess({ weightunit: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitActions.createRequest),
            switchMap(({ weightunit }) => {
                return this._apiService.createWeightUnit(formatWeightUnitModel(weightunit)).pipe(
                    mergeMap(res => {
                        return [WeightUnitActions.createSuccess({ weightunit: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(WeightUnitActions.updateRequest),
            switchMap(({ id, weightunit }) => {
                return this._apiService.updateWeightUnit(id, formatWeightUnitModel(weightunit)).pipe(
                    mergeMap(res => {
                        return [WeightUnitActions.updateSuccess({ weightunit: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(WeightUnitActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
