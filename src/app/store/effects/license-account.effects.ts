import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LicenseAccountActions } from '@store/actions/license-account.action';

@Injectable()
export default class LicenseAccountEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LicenseAccountActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getLicenseAccount(id).pipe(
                    mergeMap(res => {
                        return [LicenseAccountActions.getSuccess({ license: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(LicenseAccountActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
