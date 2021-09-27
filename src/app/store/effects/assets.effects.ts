import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AssetsActions } from '@store/actions/assets.action';
import { formatAssetModel } from '@app/utils/asset.util';

@Injectable()
export default class AssetsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AssetsActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getAssets().pipe(
                    mergeMap(res => {
                        return [AssetsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AssetsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AssetsActions.createRequest),
            switchMap(asset => {
                return this._apiService.createAsset(formatAssetModel(asset)).pipe(
                    mergeMap(res => {
                        return [AssetsActions.createSuccess({ asset: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AssetsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AssetsActions.updateRequest),
            switchMap(({ id, asset }) => {
                return this._apiService.updateAsset(id, formatAssetModel(asset)).pipe(
                    mergeMap(res => {
                        return [AssetsActions.updateSuccess({ asset: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AssetsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AssetsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteAsset(id).pipe(
                    mergeMap(res => {
                        return [AssetsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(AssetsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
