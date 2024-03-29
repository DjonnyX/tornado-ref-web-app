import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ApplicationsActions } from '@store/actions/applications.action';
import { formatApplicationModel } from '@app/utils/application.util';

@Injectable()
export default class ApplicationsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ApplicationsActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getApplications(options).pipe(
                    mergeMap(res => {
                        return [ApplicationsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(ApplicationsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ApplicationsActions.updateRequest),
            switchMap(({ id, application }) => {
                return this._apiService.updateApplication(id, formatApplicationModel(application)).pipe(
                    mergeMap(res => {
                        return [ApplicationsActions.updateSuccess({ application: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(ApplicationsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(ApplicationsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteApplication(id).pipe(
                    mergeMap(res => {
                        return [ApplicationsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        return of(ApplicationsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
