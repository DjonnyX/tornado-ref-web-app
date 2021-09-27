import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ApplicationActions } from '@store/actions/application.action';
import { formatApplicationModel } from '@app/utils/application.util';

@Injectable()
export default class ApplicationEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ApplicationActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getApplication(id).pipe(
                    mergeMap(res => {
                        return [ApplicationActions.getSuccess({ application: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(ApplicationActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ApplicationActions.createRequest),
            switchMap(({ application }) => {
                return this._apiService.createApplication(formatApplicationModel(application)).pipe(
                    mergeMap(res => {
                        return [ApplicationActions.createSuccess({ application: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(ApplicationActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ApplicationActions.updateRequest),
            switchMap(({ id, application }) => {
                return this._apiService.updateApplication(id, formatApplicationModel(application)).pipe(
                    mergeMap(res => {
                        return [ApplicationActions.updateSuccess({ application: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(ApplicationActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
