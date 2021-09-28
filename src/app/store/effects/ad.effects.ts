import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AdActions } from '@store/actions/ad.action';
import { formatAdModel } from '@app/utils/ad.util';

@Injectable()
export default class AdEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getAd(id).pipe(
                    mergeMap(res => {
                        return [AdActions.getSuccess({ ad: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(AdActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdActions.createRequest),
            switchMap(({ ad }) => {
                return this._apiService.createAd(formatAdModel(ad)).pipe(
                    mergeMap(res => {
                        return [AdActions.createSuccess({ ad: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(AdActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AdActions.updateRequest),
            switchMap(({ id, ad }) => {
                return this._apiService.updateAd(id, formatAdModel(ad)).pipe(
                    mergeMap(res => {
                        return [AdActions.updateSuccess({ ad: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(AdActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
