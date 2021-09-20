import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { RolesActions } from '@store/actions/roles.action';
import { formatRoleModel } from '@app/utils/role.util';

@Injectable()
export default class RolesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RolesActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getRoles(options).pipe(
                    mergeMap(res => {
                        return [RolesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RolesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RolesActions.createRequest),
            switchMap(({ data, options }) => {
                return this._apiService.signup({
                    integrationId: data.integrationId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    captchaId: data.captchaId,
                    captchaValue: data.captchaValue,
                }).pipe(
                    mergeMap(({ client }) => {
                        this._router.navigate(["signin"]);
                        this._notificationService.success("Registration confirmed.");
                        return this._apiService.getRole(client).pipe(
                            mergeMap(({ data }) => {
                                return [RolesActions.createSuccess({ role: data })];
                            }),
                        );
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RolesActions.createError({ error: error.message }))
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RolesActions.updateRequest),
            switchMap(({ id, role }) => {
                return this._apiService.updateRole(id, formatRoleModel(role)).pipe(
                    mergeMap(res => {
                        return [RolesActions.updateSuccess({ role: res.data, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RolesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(RolesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteRole(id).pipe(
                    mergeMap(res => {
                        return [RolesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(RolesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
