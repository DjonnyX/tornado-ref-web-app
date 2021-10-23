import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { RefServerInfoActions } from "@store/actions/ref-server-info.action";

@Injectable()
export default class RefServerInfoEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RefServerInfoActions.getRequest),
            switchMap(() => {
                return this._apiService.getRefServerInfo().pipe(
                    mergeMap(res => {
                        return [RefServerInfoActions.getSuccess({ info: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(RefServerInfoActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
