import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { formatIntegrationModel } from '@app/utils/integration.util';

@Injectable()
export default class IntegrationsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getIntegrations(options).pipe(
                    mergeMap(res => {
                        return [IntegrationsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationsActions.createRequest),
            switchMap(({ integration, secure }) => {
                return this._apiService.createIntegration(formatIntegrationModel(integration), secure).pipe(
                    mergeMap(res => {
                        return [IntegrationsActions.createSuccess({ integration: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationsActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationsActions.updateRequest),
            switchMap(({ id, integration, secure }) => {
                return this._apiService.updateIntegration(id, formatIntegrationModel(integration), secure).pipe(
                    mergeMap(res => {
                        return [IntegrationsActions.updateSuccess({ integration: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteIntegration(id).pipe(
                    mergeMap(res => {
                        return [IntegrationsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(IntegrationsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
