import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { formatLicenseTypeModel } from '@app/utils/license-type.util';

@Injectable()
export default class LicenseTypesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseTypesActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getLicenseTypes().pipe(
                    mergeMap(res => {
                        return [LicenseTypesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseTypesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseTypesActions.updateRequest),
            switchMap(({ id, licenseType }) => {
                return this._apiService.updateLicenseType(id, formatLicenseTypeModel(licenseType)).pipe(
                    mergeMap(res => {
                        return [LicenseTypesActions.updateSuccess({ licenseType: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseTypesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseTypesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteLicenseType(id).pipe(
                    mergeMap(res => {
                        return [LicenseTypesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseTypesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
