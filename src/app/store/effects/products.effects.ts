import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ProductsActions } from '@store/actions/products.action';
import { AssetsActions } from '@store/actions/assets.action';

@Injectable()
export default class ProductsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductsActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getProducts().pipe(
                    mergeMap(res => {
                        return [ProductsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductsActions.createRequest),
            switchMap(product => {
                return this._apiService.createProduct({
                    name: product.name,
                    description: product.description,
                    tags: product.tags,
                    receipt: product.receipt,
                    assets: product.assets,
                }).pipe(
                    mergeMap(res => {
                        return [ProductsActions.createSuccess({ product: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductsActions.updateRequest),
            switchMap(({ id, product }) => {
                return this._apiService.updateProduct(id, {
                    name: product.name,
                    description: product.description,
                    receipt: product.receipt,
                    tags: product.tags,
                    assets: product.assets,
                }).pipe(
                    mergeMap(res => {
                        return [ProductsActions.updateSuccess({ product: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteProduct(id).pipe(
                    mergeMap(res => {
                        return [ProductsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly uploadAssetRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductsActions.uploadAssetRequest),
            switchMap(({productId, file}) => {
                return this._apiService.createProductAsset(productId, file).pipe(
                    mergeMap(res => {
                        return [
                            AssetsActions.updateSuccess({ asset: res.data.asset, meta: res.meta.asset}),
                            ProductsActions.updateSuccess({ product: res.data.product, meta: res.meta.product}),
                            ProductsActions.uploadAssetSuccess({ product: res.data.product, asset: res.data.asset, meta: res.meta }),
                        ];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductsActions.uploadAssetError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly removeAssetRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductsActions.removeAssetRequest),
            switchMap(({productId, assetId}) => {
                return this._apiService.deleteProductAsset(productId, assetId).pipe(
                    mergeMap(res => {
                        return [
                            AssetsActions.deleteSuccess({ id: assetId, meta: res.meta.asset}),
                            ProductsActions.deleteSuccess({ id: productId, meta: res.meta.product}),
                            ProductsActions.removeAssetSuccess({ productId, assetId, meta: res.meta }),
                        ];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductsActions.removeAssetError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
