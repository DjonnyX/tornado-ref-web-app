import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AdAssetsActions } from '@store/actions/ad-assets.action';
import { IAsset } from '@models';
import { AdActions } from '@store/actions/ad.action';

@Injectable()
export default class AdAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdAssetsActions.uploadResourceRequest),
            switchMap(({ adId, resourcesType, data }) => {
                const id = String(this.nextTmpAssetId);
                const ext = data.file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastupdate: new Date(Date.now()),
                    name: data.file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                }
                this._store.dispatch(AdActions.updateResource({
                    langCode: data.langCode,
                    resourcesType,
                    assetId: id,
                }));
                return this._apiService.uploadAdResource(adId, resourcesType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [AdAssetsActions.uploadResourceProgress({
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
                            return [AdAssetsActions.uploadResourceProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [AdAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode }), AdActions.getRequest({ id: adId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdAssetsActions.getAllRequest),
            switchMap(({ adId }) => {
                return this._apiService.getAdAllAssets(adId).pipe(
                    mergeMap(res => {
                        return [AdAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllByLangRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdAssetsActions.getAllByLangRequest),
            switchMap(({ adId, langCode }) => {
                return this._apiService.getAdAllByLangAssets(adId, langCode).pipe(
                    mergeMap(res => {
                        return [AdAssetsActions.getAllByLangSuccess({ collection: res.data, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdAssetsActions.getAllByLangError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdAssetsActions.createRequest),
            switchMap(({ adId, data }) => {
                const id = String(this.nextTmpAssetId);
                const ext = data.file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastupdate: new Date(Date.now()),
                    name: data.file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                }
                return this._apiService.createAdAsset(adId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [AdAssetsActions.createProgress({
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
                            return [AdAssetsActions.createProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [AdAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode, }), AdActions.getRequest({ id: adId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdAssetsActions.updateRequest),
            switchMap(({ asset, adId, langCode }) => {
                return this._apiService.updateAdAsset(adId, langCode, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [AdAssetsActions.updateSuccess({ asset: res.data.asset, langCode, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdAssetsActions.deleteRequest),
            switchMap(({ adId, assetId, langCode }) => {
                return this._apiService.deleteAdAsset(adId, langCode, assetId).pipe(
                    mergeMap(res => {
                        return [AdAssetsActions.deleteSuccess({ id: assetId, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
