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
import { IAsset } from '@models';
import { ProductActions } from '@store/actions/product.action';

@Injectable()
export default class ProductAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.uploadResourceRequest),
            switchMap(({ productId, resourcesType, data }) => {
                const id = String(this.nextTmpAssetId);
                const ext = data.file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastUpdate: new Date(Date.now()),
                    name: data.file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                    extra: {},
                }
                this._store.dispatch(ProductActions.updateResource({
                    langCode: data.langCode,
                    resourcesType,
                    assetId: id,
                }));
                return this._apiService.uploadProductResource(productId, resourcesType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [ProductAssetsActions.uploadResourceProgress({
                                tmpAsset,
                                langCode: data.langCode,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [ProductAssetsActions.uploadResourceProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [ProductAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode }), ProductActions.getRequest({ id: productId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(ProductAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.getAllRequest),
            switchMap(({ productId }) => {
                return this._apiService.getProductAllAssets(productId).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(ProductAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllByLangRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.getAllByLangRequest),
            switchMap(({ productId, langCode }) => {
                return this._apiService.getProductAllByLangAssets(productId, langCode).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.getAllByLangSuccess({ collection: res.data, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(ProductAssetsActions.getAllByLangError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.createRequest),
            switchMap(({ productId, data }) => {
                const id = String(this.nextTmpAssetId);
                const ext = data.file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastUpdate: new Date(Date.now()),
                    name: data.file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                    extra: {},
                }
                return this._apiService.createProductAsset(productId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [ProductAssetsActions.createProgress({
                                tmpAsset,
                                langCode: data.langCode,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [ProductAssetsActions.createProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [ProductAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode, }), ProductActions.getRequest({ id: productId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(ProductAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.updateRequest),
            switchMap(({ asset, productId, langCode }) => {
                return this._apiService.updateProductAsset(productId, langCode, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.updateSuccess({ asset: res.data.asset, langCode, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(ProductAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ProductAssetsActions.deleteRequest),
            switchMap(({ productId, assetId, langCode }) => {
                return this._apiService.deleteProductAsset(productId, langCode, assetId).pipe(
                    mergeMap(res => {
                        return [ProductAssetsActions.deleteSuccess({ id: assetId, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(ProductAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
