import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LanguageAssetsActions } from '@store/actions/language-assets.action';
import { IAsset } from '@models';
import { LanguageActions } from '@store/actions/language.action';

@Injectable()
export default class LanguageAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.uploadResourceRequest),
            switchMap(({ languageId, resourcesType, file }) => {
                const id = String(this.nextTmpAssetId);
                const ext = file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastUpdate: new Date(Date.now()),
                    name: file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                    extra: {},
                }
                return this._apiService.uploadLanguageResource(languageId, resourcesType, file).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [LanguageAssetsActions.uploadResourceProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [LanguageAssetsActions.uploadResourceProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [LanguageAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset, }), LanguageActions.getRequest({ id: languageId })];
                    }),
                    catchError((error: Error) => {
                        return of(LanguageAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.getAllRequest),
            switchMap(({ languageId }) => {
                return this._apiService.getLanguageAssets(languageId).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(LanguageAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.createRequest),
            switchMap(({ languageId, file }) => {
                const id = String(this.nextTmpAssetId);
                const ext = file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastUpdate: new Date(Date.now()),
                    name: file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                    extra: {},
                }
                return this._apiService.createLanguageAsset(languageId, file).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [LanguageAssetsActions.createProgress({
                                tmpAsset,
                                progress: {
                                    total: 0,
                                    progress: 0,
                                    loaded: 0,
                                }
                            })];
                        }
                        if (!!res.data.progress) {
                            return [LanguageAssetsActions.createProgress({ tmpAsset, progress: res.data.progress })];
                        }
                        return [LanguageAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, }), LanguageActions.getRequest({ id: languageId })];
                    }),
                    catchError((error: Error) => {
                        return of(LanguageAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.updateRequest),
            switchMap(({ asset, languageId }) => {
                return this._apiService.updateLanguageAsset(languageId, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.updateSuccess({ asset: res.data.asset, meta: res.meta.asset })];
                    }),
                    catchError((error: Error) => {
                        return of(LanguageAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.deleteRequest),
            switchMap(({ languageId, assetId }) => {
                return this._apiService.deleteLanguageAsset(languageId, assetId).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.deleteSuccess({ id: assetId })];
                    }),
                    catchError((error: Error) => {
                        return of(LanguageAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
