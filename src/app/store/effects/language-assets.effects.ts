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

    public readonly uploadImageRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.uploadImageRequest),
            switchMap(({ languageId, imageType, data }) => {
                const id = String(this.nextTmpAssetId);
                const ext = data.file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastupdate: Date.now(),
                    name: data.file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                }
                this._store.dispatch(LanguageActions.updateImage({
                    langCode: data.langCode,
                    imageType,
                    assetId: id,
                }));
                return this._apiService.uploadLanguageImage(languageId, imageType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [LanguageAssetsActions.uploadImageProgress({
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
                            return [LanguageAssetsActions.uploadImageProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [LanguageAssetsActions.uploadImageSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode }), LanguageActions.getRequest({ id: languageId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageAssetsActions.uploadImageError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.getAllRequest),
            switchMap(({ languageId }) => {
                return this._apiService.getLanguageAllAssets(languageId).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllByLangRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.getAllByLangRequest),
            switchMap(({ languageId, langCode }) => {
                return this._apiService.getLanguageAllByLangAssets(languageId, langCode).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.getAllByLangSuccess({ collection: res.data, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageAssetsActions.getAllByLangError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.createRequest),
            switchMap(({ languageId, data }) => {
                const id = String(this.nextTmpAssetId);
                const ext = data.file.name.replace(/^.+\./, "");
                const tmpAsset: IAsset = {
                    id,
                    active: true,
                    lastupdate: Date.now(),
                    name: data.file.name,
                    path: undefined,
                    mipmap: {
                        x128: undefined,
                        x32: undefined,
                    },
                    ext: ext,
                }
                return this._apiService.createLanguageAsset(languageId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [LanguageAssetsActions.createProgress({
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
                            return [LanguageAssetsActions.createProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [LanguageAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode, }), LanguageActions.getRequest({ id: languageId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.updateRequest),
            switchMap(({ asset, languageId, langCode }) => {
                return this._apiService.updateLanguageAsset(languageId, langCode, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.updateSuccess({ asset: res.data.asset, langCode, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageAssetsActions.deleteRequest),
            switchMap(({ languageId, assetId, langCode }) => {
                return this._apiService.deleteLanguageAsset(languageId, langCode, assetId).pipe(
                    mergeMap(res => {
                        return [LanguageAssetsActions.deleteSuccess({ id: assetId, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
