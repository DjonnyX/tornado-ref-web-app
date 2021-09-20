import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AppThemeActions } from '@store/actions/app-theme.action';
import { formatAppThemeModel } from '@app/utils/app-theme.util';

@Injectable()
export default class AppThemeEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getAppTheme(id).pipe(
                    mergeMap(res => {
                        return [AppThemeActions.getSuccess({ theme: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeActions.createRequest),
            switchMap(({theme, terminalType}) => {
                return this._apiService.createAppTheme(formatAppThemeModel(theme), terminalType).pipe(
                    mergeMap(res => {
                        return [AppThemeActions.createSuccess({ theme: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemeActions.updateRequest),
            switchMap(({ id, theme }) => {
                return this._apiService.updateAppTheme(id, formatAppThemeModel(theme)).pipe(
                    mergeMap(res => {
                        return [AppThemeActions.updateSuccess({ theme: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemeActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
