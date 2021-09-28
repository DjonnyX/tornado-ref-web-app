import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SystemTagActions } from '@store/actions/system-tag.action';
import { formatSystemTagModel } from '@app/utils/system-tag.util';

@Injectable()
export default class SystemTagEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getSystemTag(id).pipe(
                    mergeMap(res => {
                        return [SystemTagActions.getSuccess({ systemTag: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SystemTagActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagActions.createRequest),
            switchMap(({ systemTag }) => {
                return this._apiService.createSystemTag(formatSystemTagModel(systemTag)).pipe(
                    mergeMap(res => {
                        return [SystemTagActions.createSuccess({ systemTag: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SystemTagActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SystemTagActions.updateRequest),
            switchMap(({ id, systemTag }) => {
                return this._apiService.updateSystemTag(id, formatSystemTagModel(systemTag)).pipe(
                    mergeMap(res => {
                        return [SystemTagActions.updateSuccess({ systemTag: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SystemTagActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
