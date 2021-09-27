import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { CheckuesActions } from '@store/actions/checkues.action';
import { formatCheckueModel } from '@app/utils/checkue.utils';

@Injectable()
export default class CheckuesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckuesActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getCheckues(options).pipe(
                    mergeMap(res => {
                        return [CheckuesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(CheckuesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckuesActions.createRequest),
            switchMap(({ checkue }) => {
                return this._apiService.createCheckue(formatCheckueModel(checkue)).pipe(
                    mergeMap(res => {
                        return [CheckuesActions.createSuccess({ checkue: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(CheckuesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckuesActions.updateRequest),
            switchMap(({ id, checkue, setDafault }) => {
                return this._apiService.updateCheckue(id, formatCheckueModel(checkue)).pipe(
                    mergeMap(res => {
                        if (setDafault) {
                            this._store.dispatch(CheckuesActions.getAllRequest({}));
                            return [CheckuesActions.updateSuccess({ checkue: res.data, meta: res.meta })];
                        }
                        return [CheckuesActions.updateSuccess({ checkue: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(CheckuesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckuesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteCheckue(id).pipe(
                    mergeMap(res => {
                        return [CheckuesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(CheckuesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
