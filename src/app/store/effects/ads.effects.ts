import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AdsActions } from '@store/actions/ads.action';
import { formatAdModel } from '@app/utils/ad.util';

@Injectable()
export default class AdsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdsActions.getAllRequest),
            switchMap(({ adType }) => {
                return this._apiService.getAds(adType).pipe(
                    mergeMap(res => {
                        return [AdsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdsActions.createRequest),
            switchMap(({ ad }) => {
                return this._apiService.createAd(formatAdModel(ad)).pipe(
                    mergeMap(res => {
                        return [AdsActions.createSuccess({ ad: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdsActions.updateRequest),
            switchMap(({ id, ad }) => {
                return this._apiService.updateAd(id, formatAdModel(ad)).pipe(
                    mergeMap(res => {
                        return [AdsActions.updateSuccess({ ad: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteAd(id).pipe(
                    mergeMap(res => {
                        return [AdsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AdsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
