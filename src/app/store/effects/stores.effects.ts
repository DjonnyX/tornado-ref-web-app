import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { StoresActions } from '@store/actions/stores.action';
import { formatStoreModel } from '@app/utils/store.util';

@Injectable()
export default class StoresEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoresActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getStores(options).pipe(
                    mergeMap(res => {
                        return [StoresActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(StoresActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoresActions.createRequest),
            switchMap(({ store }) => {
                return this._apiService.createStore(formatStoreModel(store)).pipe(
                    mergeMap(res => {
                        return [StoresActions.createSuccess({ store: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(StoresActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoresActions.updateRequest),
            switchMap(({ id, store }) => {
                return this._apiService.updateStore(id, formatStoreModel(store)).pipe(
                    mergeMap(res => {
                        return [StoresActions.updateSuccess({ store: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(StoresActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoresActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteStore(id).pipe(
                    mergeMap(res => {
                        return [StoresActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(StoresActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
