import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { formatOrderTypeModel } from '@app/utils/order-type.util';

@Injectable()
export default class OrderTypeEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getOrderType(id).pipe(
                    mergeMap(res => {
                        return [OrderTypeActions.getSuccess({ orderType: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeActions.createRequest),
            switchMap(({orderType}) => {
                return this._apiService.createOrderType(formatOrderTypeModel(orderType)).pipe(
                    mergeMap(res => {
                        return [OrderTypeActions.createSuccess({ orderType: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeActions.updateRequest),
            switchMap(({ id, orderType }) => {
                return this._apiService.updateOrderType(id, formatOrderTypeModel(orderType)).pipe(
                    mergeMap(res => {
                        return [OrderTypeActions.updateSuccess({ orderType: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
