import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { StoreActions } from '@store/actions/store.action';
import { formatStoreModel } from '@app/utils/store.util';

@Injectable()
export default class StoreEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getStore(id).pipe(
                    mergeMap(res => {
                        return [StoreActions.getSuccess({ store: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(StoreActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreActions.createRequest),
            switchMap(({store}) => {
                return this._apiService.createStore(formatStoreModel(store)).pipe(
                    mergeMap(res => {
                        return [StoreActions.createSuccess({ store: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(StoreActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreActions.updateRequest),
            switchMap(({ id, store }) => {
                return this._apiService.updateStore(id, formatStoreModel(store)).pipe(
                    mergeMap(res => {
                        return [StoreActions.updateSuccess({ store: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(StoreActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
