import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AppThemeAssetsActions } from '@store/actions/app-theme-assets.action';
import { IAsset } from '@models';
import { AppThemeActions } from '@store/actions/app-theme.action';

@Injectable()
export default class AppThemeAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeAssetsActions.uploadResourceRequest),
            switchMap(({ themeId, resourcesType, data }) => {
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
                    extra: {
                        themeId,
                    },
                }
                this._store.dispatch(AppThemeActions.updateResource({
                    themeId,
                    resourcesType,
                    assetId: id,
                }));
                return this._apiService.uploadAppThemeResource(themeId, resourcesType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [AppThemeAssetsActions.uploadResourceProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [AppThemeAssetsActions.uploadResourceProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [
                            AppThemeAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset }),
                            AppThemeActions.getRequest({ id: themeId }),
                        ];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeAssetsActions.deleteResourceRequest),
            switchMap(({ themeId, resourcesType }) => {
                return this._apiService.deleteAppThemeResource(themeId, resourcesType).pipe(
                    mergeMap((res: any) => {
                        return [
                            AppThemeAssetsActions.deleteResourceSuccess({ id: res.data.asset.id }),
                            AppThemeActions.getRequest({ id: themeId }),
                        ];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeAssetsActions.deleteResourceError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeAssetsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getAppThemeAllAssets(options).pipe(
                    mergeMap(res => {
                        return [AppThemeAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeAssetsActions.createRequest),
            switchMap(({ themeId, data }) => {
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
                    extra: {
                        themeId,
                    },
                }
                return this._apiService.createAppThemeAsset(themeId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [AppThemeAssetsActions.createProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [AppThemeAssetsActions.createProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [AppThemeAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, }), AppThemeActions.getRequest({ id: themeId })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeAssetsActions.updateRequest),
            switchMap(({ asset, themeId }) => {
                return this._apiService.updateAppThemeAsset(themeId, asset.id, {
                    name: asset.name,
                }).pipe(
                    mergeMap(res => {
                        return [AppThemeAssetsActions.updateSuccess({ asset: res.data.asset, meta: res.meta.asset })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeAssetsActions.deleteRequest),
            switchMap(({ themeId, assetId }) => {
                return this._apiService.deleteAppThemeAsset(themeId, assetId).pipe(
                    mergeMap(res => {
                        return [AppThemeAssetsActions.deleteSuccess({ id: assetId }),];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
