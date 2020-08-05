import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { BusinessPeriodActions } from '@store/actions/business-period.action';
import { formatBusinessPeriodModel } from '@app/utils/business-period.util';

@Injectable()
export default class BusinessPeriodEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getBusinessPeriod(id).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodActions.getSuccess({ businessPeriod: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(BusinessPeriodActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodActions.createRequest),
            switchMap(({ businessPeriod }) => {
                return this._apiService.createBusinessPeriod(formatBusinessPeriodModel(businessPeriod)).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodActions.createSuccess({ businessPeriod: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(BusinessPeriodActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(BusinessPeriodActions.updateRequest),
            switchMap(({ id, businessPeriod }) => {
                return this._apiService.updateBusinessPeriod(id, formatBusinessPeriodModel(businessPeriod)).pipe(
                    mergeMap(res => {
                        return [BusinessPeriodActions.updateSuccess({ businessPeriod: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(BusinessPeriodActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
