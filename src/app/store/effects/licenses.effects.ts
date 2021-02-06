import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LicensesActions } from '@store/actions/licenses.action';
import { formatLicenseModel } from '@app/utils/license.util';

@Injectable()
export default class LicensesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicensesActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getLicenses(options).pipe(
                    mergeMap(res => {
                        return [LicensesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicensesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicensesActions.updateRequest),
            switchMap(({ id, license }) => {
                return this._apiService.updateLicense(id, formatLicenseModel(license)).pipe(
                    mergeMap(res => {
                        return [LicensesActions.updateSuccess({ license: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicensesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicensesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteLicense(id).pipe(
                    mergeMap(res => {
                        return [LicensesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicensesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
