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

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.uploadResourceRequest),
            switchMap(({ selectorId, resourcesType, data }) => {
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
                }
                this._store.dispatch(SelectorActions.updateResource({
                    langCode: data.langCode,
                    resourcesType,
                    assetId: id,
                }));
                return this._apiService.uploadSelectorResource(selectorId, resourcesType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [SelectorAssetsActions.uploadResourceProgress({
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
                            return [SelectorAssetsActions.uploadResourceProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [SelectorAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode }), SelectorActions.getRequest({ id: selectorId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SelectorAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.getAllRequest),
            switchMap(({ selectorId }) => {
                return this._apiService.getSelectorAllAssets(selectorId).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SelectorAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllByLangRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.getAllByLangRequest),
            switchMap(({ selectorId, langCode }) => {
                return this._apiService.getSelectorAllByLangAssets(selectorId, langCode).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.getAllByLangSuccess({ collection: res.data, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SelectorAssetsActions.getAllByLangError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.createRequest),
            switchMap(({ selectorId, data }) => {
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
                }
                return this._apiService.createSelectorAsset(selectorId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [SelectorAssetsActions.createProgress({
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
                            return [SelectorAssetsActions.createProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [SelectorAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode, }), SelectorActions.getRequest({ id: selectorId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SelectorAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.updateRequest),
            switchMap(({ asset, selectorId, langCode }) => {
                return this._apiService.updateSelectorAsset(selectorId, langCode, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.updateSuccess({ asset: res.data.asset, langCode, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SelectorAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorAssetsActions.deleteRequest),
            switchMap(({ selectorId, assetId, langCode }) => {
                return this._apiService.deleteSelectorAsset(selectorId, langCode, assetId).pipe(
                    mergeMap(res => {
                        return [SelectorAssetsActions.deleteSuccess({ id: assetId, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SelectorAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
