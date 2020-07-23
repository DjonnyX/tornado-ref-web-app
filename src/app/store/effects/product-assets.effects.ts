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
                const id = String(this.nextTmpAssetId);
                const ext = file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    lastupdate: Date.now(),
                    name: file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                }
                return this._apiService.createProductAsset(productId, file).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [ProductAssetsActions.createProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [ProductAssetsActions.createProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [ProductAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, }), ProductActions.getRequest({ id: productId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(ProductAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

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
