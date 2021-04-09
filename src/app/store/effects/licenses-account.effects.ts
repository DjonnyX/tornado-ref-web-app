import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LicensesAccountActions } from '@store/actions/licenses-account.action';

@Injectable()
export default class LicensesAccountEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicensesAccountActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getLicensesAccount(options).pipe(
                    mergeMap(res => {
                        return [LicensesAccountActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicensesAccountActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly unbindRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicensesAccountActions.unbindRequest),
            switchMap(({ id }) => {
                return this._apiService.unbindLicense(id).pipe(
                    mergeMap(res => {
                        return [LicensesAccountActions.unbindSuccess({ license: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LicensesAccountActions.unbindError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
