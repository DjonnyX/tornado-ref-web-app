import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { OrderTypeAssetsActions } from '@store/actions/order-type-assets.action';
import { IAsset } from '@models';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { formatAssetModel } from '@app/utils/asset.util';

@Injectable()
export default class OrderTypeAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.getAllRequest),
            switchMap(({ orderTypeId }) => {
                return this._apiService.getOrderTypeAssets(orderTypeId).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(OrderTypeAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.createRequest),
            switchMap(({ orderTypeId, file }) => {
                const id = String(this.nextTmpAssetId);
                const ext = file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastupdate: Date.now(),
                    name: file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                }
                return this._apiService.createOrderTypeAsset(orderTypeId, file).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [OrderTypeAssetsActions.createProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [OrderTypeAssetsActions.createProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [OrderTypeAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, }), OrderTypeActions.getRequest({ id: orderTypeId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(OrderTypeAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.updateRequest),
            switchMap(({ asset, orderTypeId }) => {
                return this._apiService.updateOrderTypeAsset(orderTypeId, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.updateSuccess({ asset: res.data.asset, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(OrderTypeAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.deleteRequest),
            switchMap(({ orderTypeId, assetId }) => {
                return this._apiService.deleteOrderTypeAsset(orderTypeId, assetId).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.deleteSuccess({ id: assetId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(OrderTypeAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
