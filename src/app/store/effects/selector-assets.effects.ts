import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SelectorAssetsActions } from '@store/actions/selector-assets.action';
import { IAsset } from '@models';
import { ProductActions } from '@store/actions/product.action';
import { SelectorActions } from '@store/actions/selector.action';

@Injectable()
export default class SelectorAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

        public readonly uploadImageRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.uploadImageRequest),
            switchMap(({ selectorId, imageType, file }) => {
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
                return this._apiService.uploadSelectorImage(selectorId, imageType, file).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [SelectorAssetsActions.uploadImageProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [SelectorAssetsActions.uploadImageProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [SelectorAssetsActions.uploadImageSuccess({ asset: res.data.asset, tmpAsset, }), SelectorActions.getRequest({ id: selectorId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorAssetsActions.uploadImageError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.getAllRequest),
            switchMap(({ selectorId }) => {
                return this._apiService.getSelectorAssets(selectorId).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.createRequest),
            switchMap(({ selectorId, file }) => {
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
                return this._apiService.createSelectorAsset(selectorId, file).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [SelectorAssetsActions.createProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [SelectorAssetsActions.createProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [SelectorAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, }), SelectorActions.getRequest({ id: selectorId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.updateRequest),
            switchMap(({ asset, selectorId }) => {
                return this._apiService.updateSelectorAsset(selectorId, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.updateSuccess({ asset: res.data.asset, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.deleteRequest),
            switchMap(({ selectorId, assetId }) => {
                return this._apiService.deleteSelectorAsset(selectorId, assetId).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.deleteSuccess({ id: assetId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
