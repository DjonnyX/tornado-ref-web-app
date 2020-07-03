import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SelectorsActions } from '@store/actions/selectors.action';

@Injectable()
export default class ProductsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorsActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getSelectors().pipe(
                    mergeMap(res => {
                        return [SelectorsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorsActions.createRequest),
            switchMap(selector => {
                return this._apiService.createSelector({
                    name: selector.name,
                    description: selector.description,
                }).pipe(
                    mergeMap(res => {
                        return [SelectorsActions.createSuccess({ selector: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorsActions.updateRequest),
            switchMap(({ id, selector }) => {
                return this._apiService.updateSelector(id, {
                    name: selector.name,
                    description: selector.description,
                }).pipe(
                    mergeMap(res => {
                        return [SelectorsActions.updateSuccess({ selector: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteSelector(id).pipe(
                    mergeMap(res => {
                        return [SelectorsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(SelectorsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
