import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TagAssetsActions } from '@store/actions/tag-assets.action';
import { IAsset } from '@models';
import { TagActions } from '@store/actions/tag.action';

@Injectable()
export default class TagAssetsEffects {
    private _currentAssetId: number = 0;

    private get nextTmpAssetId() {
        this._currentAssetId++;

        return this._currentAssetId;
    }

    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly uploadResourceRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagAssetsActions.uploadResourceRequest),
            switchMap(({ tagId, resourcesType, data }) => {
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
                this._store.dispatch(TagActions.updateResource({
                    langCode: data.langCode,
                    resourcesType,
                    assetId: id,
                }));
                return this._apiService.uploadTagResource(tagId, resourcesType, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [TagAssetsActions.uploadResourceProgress({
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
                            return [TagAssetsActions.uploadResourceProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [TagAssetsActions.uploadResourceSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode }), TagActions.getRequest({ id: tagId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagAssetsActions.uploadResourceError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagAssetsActions.getAllRequest),
            switchMap(({ tagId }) => {
                return this._apiService.getTagAllAssets(tagId).pipe(
                    mergeMap(res => {
                        return [TagAssetsActions.getAllSuccess({ collection: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagAssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly getAllByLangRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagAssetsActions.getAllByLangRequest),
            switchMap(({ tagId, langCode }) => {
                return this._apiService.getTagAllByLangAssets(tagId, langCode).pipe(
                    mergeMap(res => {
                        return [TagAssetsActions.getAllByLangSuccess({ collection: res.data, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagAssetsActions.getAllByLangError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagAssetsActions.createRequest),
            switchMap(({ tagId, data }) => {
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
                return this._apiService.createTagAsset(tagId, data).pipe(
                    mergeMap((res: any) => {
                        if (!res) {
                            return [TagAssetsActions.createProgress({
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
                            return [TagAssetsActions.createProgress({ tmpAsset, langCode: data.langCode, progress: res.data.progress })];
                        }
                        return [TagAssetsActions.createSuccess({ asset: res.data.asset, tmpAsset, langCode: data.langCode, }), TagActions.getRequest({ id: tagId })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagAssetsActions.createError({ tmpAsset, error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagAssetsActions.updateRequest),
            switchMap(({ asset, tagId, langCode }) => {
                return this._apiService.updateTagAsset(tagId, langCode, asset.id, {
                    name: asset.name,
                    active: asset.active,
                }).pipe(
                    mergeMap(res => {
                        return [TagAssetsActions.updateSuccess({ asset: res.data.asset, langCode, meta: res.meta.asset })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagAssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagAssetsActions.deleteRequest),
            switchMap(({ tagId, assetId, langCode }) => {
                return this._apiService.deleteTagAsset(tagId, langCode, assetId).pipe(
                    mergeMap(res => {
                        return [TagAssetsActions.deleteSuccess({ id: assetId, langCode })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagAssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
