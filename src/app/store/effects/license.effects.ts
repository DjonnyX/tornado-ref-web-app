import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LicenseActions } from '@store/actions/license.action';
import { formatLicenseModel } from '@app/utils/license.util';

@Injectable()
export default class LicenseEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getLicense(id).pipe(
                    mergeMap(res => {
                        return [LicenseActions.getSuccess({ license: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseActions.updateRequest),
            switchMap(({ id, license }) => {
                return this._apiService.updateLicense(id, formatLicenseModel(license)).pipe(
                    mergeMap(res => {
                        return [LicenseActions.updateSuccess({ license: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicenseActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
