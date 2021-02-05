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
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(IntegrationsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(IntegrationsActions.updateRequest),
            switchMap(({ id, integration }) => {
                return this._apiService.updateIntegration(id, formatIntegrationModel(integration)).pipe(
                    mergeMap(res => {
                        return [IntegrationsActions.updateSuccess({ integration: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(IntegrationsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
