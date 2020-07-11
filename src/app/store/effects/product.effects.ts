import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ProductActions } from '@store/actions/product.action';
import { formatProductModel } from '@app/utils/product.util';

@Injectable()
export default class ProductEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getProduct(id).pipe(
                    mergeMap(res => {
                        return [ProductActions.getSuccess({ product: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.createRequest),
            switchMap(product => {
                return this._apiService.createProduct(formatProductModel(product)).pipe(
                    mergeMap(res => {
                        return [ProductActions.createSuccess({ product: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductActions.updateRequest),
            switchMap(({ id, product }) => {
                return this._apiService.updateProduct(id, formatProductModel(product)).pipe(
                    mergeMap(res => {
                        return [ProductActions.updateSuccess({ product: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
