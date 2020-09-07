import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TagActions } from '@store/actions/tag.action';
import { formatTagModel } from '@app/utils/tag.util';

@Injectable()
export default class TagEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getTag(id).pipe(
                    mergeMap(res => {
                        return [TagActions.getSuccess({ tag: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagActions.createRequest),
            switchMap(({tag}) => {
                return this._apiService.createTag(formatTagModel(tag)).pipe(
                    mergeMap(res => {
                        return [TagActions.createSuccess({ tag: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TagActions.updateRequest),
            switchMap(({ id, tag }) => {
                return this._apiService.updateTag(id, formatTagModel(tag)).pipe(
                    mergeMap(res => {
                        return [TagActions.updateSuccess({ tag: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TagActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
