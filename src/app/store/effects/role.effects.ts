import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { RoleActions } from '@store/actions/role.action';
import { formatRoleModel } from '@app/utils/role.util';

@Injectable()
export default class RoleEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RoleActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getRole(id).pipe(
                    mergeMap(res => {
                        return [RoleActions.getSuccess({ role: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RoleActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RoleActions.createRequest),
            switchMap(({ data, options }) => {
                return this._apiService.createRole(formatRoleModel(data)).pipe(
                    mergeMap(res => {
                        return [RoleActions.createSuccess({ role: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RoleActions.createError({ error: error.message }))
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RoleActions.updateRequest),
            switchMap(({ id, role }) => {
                return this._apiService.updateRole(id, formatRoleModel(role)).pipe(
                    mergeMap(res => {
                        return [RoleActions.updateSuccess({ role: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RoleActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RoleActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteRole(id).pipe(
                    mergeMap(res => {
                        return [RoleActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RoleActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
