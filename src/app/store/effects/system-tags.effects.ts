import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SystemTagsActions } from '@store/actions/system-tags.action';
import { formatSystemTagModel } from '@app/utils/system-tag.util';

@Injectable()
export default class SystemTagsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagsActions.getAllRequest),
            switchMap(({ params, callback }) => {
                return this._apiService.getSystemTags(params?.options).pipe(
                    mergeMap(res => {
                        callback(null, res.data);
                        return [SystemTagsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        callback(error.message);
                        this._notificationService.error(error.message);
                        return of(SystemTagsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagsActions.createRequest),
            switchMap(({ systemTag }) => {
                return this._apiService.createSystemTag(formatSystemTagModel(systemTag)).pipe(
                    mergeMap(res => {
                        return [SystemTagsActions.createSuccess({ systemTag: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SystemTagsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagsActions.updateRequest),
            switchMap(({ id, systemTag }) => {
                return this._apiService.updateSystemTag(id, formatSystemTagModel(systemTag)).pipe(
                    mergeMap(res => {
                        return [SystemTagsActions.updateSuccess({ systemTag: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SystemTagsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updatePositionsRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagsActions.repositionRequest),
            switchMap(({ positions, options }) => {
                return this._apiService.updateSystemTagsPositions(positions, options).pipe(
                    mergeMap(res => {
                        return [SystemTagsActions.repositionSuccess({ positions, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(SystemTagsActions.repositionError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagsActions.deleteRequest),
            switchMap(({ params, callback }) => {
                return this._apiService.deleteSystemTag(params?.id).pipe(
                    mergeMap(res => {
                        callback(null, params.id);
                        return [SystemTagsActions.deleteSuccess({ id: params.id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        callback(error.message);
                        this._notificationService.error(error.message);
                        return of(SystemTagsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
