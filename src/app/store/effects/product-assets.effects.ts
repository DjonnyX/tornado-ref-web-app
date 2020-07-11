import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ProductAssetsActions } from '@store/actions/product-assets.action';

@Injectable()
export default class ProductAssetsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.getAllRequest),
            switchMap(({ productId }) => {
                return this._apiService.getProductAssets(productId).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.createRequest),
            switchMap(({ productId, file }) => {
                return this._apiService.createProductAsset(productId, file).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.createSuccess({ asset: res.data.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductAssetsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    /*public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.updateRequest),
            switchMap(({ productId, asset }) => {
                return this._apiService.updateProductAsset(id, {
                    name: asset.name,
                    ext: asset.ext,
                    path: asset.path,
                }).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.updateSuccess({ asset: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );*/

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.deleteRequest),
            switchMap(({ productId, assetId }) => {
                return this._apiService.deleteProductAsset(productId, assetId).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.deleteSuccess({ id: assetId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
