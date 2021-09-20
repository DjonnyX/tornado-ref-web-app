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

@Injectable()
export default class OrderTypeAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.uploadResourceRequest),
            switchMap(({ orderTypeId, resourcesType, data }) => {
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
                this._store.dispatch(OrderTypeActions.updateResource({
                    langCode: data.langCode,
                    resourcesType,
                    assetId: id,
                }));
                return this._apiService.uploadOrderTypeResource(orderTypeId, resourcesType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [OrderTypeAssetsActions.uploadResourceProgress({
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
                            return [OrderTypeAssetsActions.uploadResourceProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [OrderTypeAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode }), OrderTypeActions.getRequest({ id: orderTypeId })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.getAllRequest),
            switchMap(({ orderTypeId }) => {
                return this._apiService.getOrderTypeAllAssets(orderTypeId).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllByLangRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.getAllByLangRequest),
            switchMap(({ orderTypeId, langCode }) => {
                return this._apiService.getOrderTypeAllByLangAssets(orderTypeId, langCode).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.getAllByLangSuccess({ collection: res.data, langCode })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeAssetsActions.getAllByLangError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.createRequest),
            switchMap(({ orderTypeId, data }) => {
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
                return this._apiService.createOrderTypeAsset(orderTypeId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [OrderTypeAssetsActions.createProgress({
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
                            return [OrderTypeAssetsActions.createProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [OrderTypeAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode, }), OrderTypeActions.getRequest({ id: orderTypeId })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.updateRequest),
            switchMap(({ asset, orderTypeId, langCode }) => {
                return this._apiService.updateOrderTypeAsset(orderTypeId, langCode, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.updateSuccess({ asset: res.data.asset, langCode, meta: res.meta.asset })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(OrderTypeAssetsActions.deleteRequest),
            switchMap(({ orderTypeId, assetId, langCode }) => {
                return this._apiService.deleteOrderTypeAsset(orderTypeId, langCode, assetId).pipe(
                    mergeMap(res => {
                        return [OrderTypeAssetsActions.deleteSuccess({ id: assetId, langCode })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(OrderTypeAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
