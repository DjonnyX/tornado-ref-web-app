import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LicenseTypeActions } from '@store/actions/license-type.action';
import { formatLicenseTypeModel } from '@app/utils/license-type.util';

@Injectable()
export default class LicenseTypeEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseTypeActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getLicenseType(id).pipe(
                    mergeMap(res => {
                        return [LicenseTypeActions.getSuccess({ licenseType: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseTypeActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseTypeActions.createRequest),
            switchMap(({ licenseType }) => {
                return this._apiService.createLicenseType(formatLicenseTypeModel(licenseType)).pipe(
                    mergeMap(res => {
                        return [LicenseTypeActions.createSuccess({ licenseType: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseTypeActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseTypeActions.updateRequest),
            switchMap(({ id, licenseType }) => {
                return this._apiService.updateLicenseType(id, formatLicenseTypeModel(licenseType)).pipe(
                    mergeMap(res => {
                        return [LicenseTypeActions.updateSuccess({ licenseType: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseTypeActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
