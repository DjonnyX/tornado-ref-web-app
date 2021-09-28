import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { formatBusinessPeriodModel } from '@app/utils/business-period.util';

@Injectable()
export default class BusinessPeriodsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getBusinessPeriods(options).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(BusinessPeriodsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodsActions.createRequest),
            switchMap(({businessPeriod}) => {
                return this._apiService.createBusinessPeriod(formatBusinessPeriodModel(businessPeriod)).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodsActions.createSuccess({ businessPeriod: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(BusinessPeriodsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodsActions.updateRequest),
            switchMap(({ id, businessPeriod }) => {
                return this._apiService.updateBusinessPeriod(id, formatBusinessPeriodModel(businessPeriod)).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodsActions.updateSuccess({ businessPeriod: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(BusinessPeriodsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteBusinessPeriod(id).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(BusinessPeriodsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
