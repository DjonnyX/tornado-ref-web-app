import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { IntegrationActions } from '@store/actions/integration.action';
import { formatIntegrationModel } from '@app/utils/integration.util';

@Injectable()
export default class IntegrationEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationActions.getRequest),
            switchMap(({ id, secure }) => {
                return this._apiService.getIntegration(id, secure).pipe(
                    mergeMap(res => {
                        return [IntegrationActions.getSuccess({ integration: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationActions.createRequest),
            switchMap(({ integration, secure }) => {
                return this._apiService.createIntegration(formatIntegrationModel(integration), secure).pipe(
                    mergeMap(res => {
                        this._router.navigate(["/admin/integrations"]);
                        return [IntegrationActions.createSuccess({ integration: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationActions.updateRequest),
            switchMap(({ id, integration, secure }) => {
                return this._apiService.updateIntegration(id, formatIntegrationModel(integration), secure).pipe(
                    mergeMap(res => {
                        this._router.navigate(["/admin/integrations"]);
                        return [IntegrationActions.updateSuccess({ integration: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
