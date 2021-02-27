import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { CheckueActions } from '@store/actions/checkue.action';
import { formatCheckueModel } from '@app/utils/checkue.utils';

@Injectable()
export default class CheckueEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckueActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getCheckue(id).pipe(
                    mergeMap(res => {
                        return [CheckueActions.getSuccess({ checkue: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CheckueActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckueActions.createRequest),
            switchMap(({checkue}) => {
                return this._apiService.createCheckue(formatCheckueModel(checkue)).pipe(
                    mergeMap(res => {
                        return [CheckueActions.createSuccess({ checkue: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CheckueActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(CheckueActions.updateRequest),
            switchMap(({ id, checkue }) => {
                return this._apiService.updateCheckue(id, formatCheckueModel(checkue)).pipe(
                    mergeMap(res => {
                        return [CheckueActions.updateSuccess({ checkue: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(CheckueActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
