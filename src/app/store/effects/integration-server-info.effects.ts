import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { IntegrationServerInfoActions } from "@store/actions/integration-server-info.action";

@Injectable()
export default class IntegrationServerInfoEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationServerInfoActions.getRequest),
            switchMap(({host}) => {
                return this._apiService.getIntegrationServerInfo(host).pipe(
                    mergeMap(res => {
                        return [IntegrationServerInfoActions.getSuccess({ info: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(IntegrationServerInfoActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
