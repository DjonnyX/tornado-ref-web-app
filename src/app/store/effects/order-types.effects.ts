import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { formatOrderTypeModel } from '@app/utils/order-type.util';

@Injectable()
export default class OrderTypesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypesActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getOrderTypes(options).pipe(
                    mergeMap(res => {
                        return [OrderTypesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(OrderTypesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypesActions.createRequest),
            switchMap(({ orderType }) => {
                return this._apiService.createOrderType(formatOrderTypeModel(orderType)).pipe(
                    mergeMap(res => {
                        return [OrderTypesActions.createSuccess({ orderType: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(OrderTypesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypesActions.updateRequest),
            switchMap(({ id, orderType, setDafault }) => {
                return this._apiService.updateOrderType(id, formatOrderTypeModel(orderType)).pipe(
                    mergeMap(res => {
                        if (setDafault) {
                            this._store.dispatch(OrderTypesActions.getAllRequest({}));
                            return [OrderTypesActions.updateSuccess({ orderType: res.data, meta: res.meta })];
                        }
                        return [OrderTypesActions.updateSuccess({ orderType: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(OrderTypesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteOrderType(id).pipe(
                    mergeMap(res => {
                        return [OrderTypesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(OrderTypesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
