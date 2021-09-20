import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TagsActions } from '@store/actions/tags.action';
import { formatTagModel } from '@app/utils/tag.util';

@Injectable()
export default class TagsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getTags(options).pipe(
                    mergeMap(res => {
                        return [TagsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagsActions.createRequest),
            switchMap(({ tag }) => {
                return this._apiService.createTag(formatTagModel(tag)).pipe(
                    mergeMap(res => {
                        return [TagsActions.createSuccess({ tag: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagsActions.updateRequest),
            switchMap(({ id, tag }) => {
                return this._apiService.updateTag(id, formatTagModel(tag)).pipe(
                    mergeMap(res => {
                        return [TagsActions.updateSuccess({ tag: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteTag(id).pipe(
                    mergeMap(res => {
                        return [TagsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
