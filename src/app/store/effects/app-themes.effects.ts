import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { AppThemesActions } from '@store/actions/app-themes.action';
import { formatAppThemeModel } from '@app/utils/app-theme.util';

@Injectable()
export default class AppThemesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemesActions.getAllRequest),
            switchMap(({ terminalType, options }) => {
                return this._apiService.getAppThemes(terminalType, options).pipe(
                    mergeMap(res => {
                        return [AppThemesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemesActions.createRequest),
            switchMap(({ theme, terminalType }) => {
                return this._apiService.createAppTheme(formatAppThemeModel(theme), terminalType).pipe(
                    mergeMap(res => {
                        return [AppThemesActions.createSuccess({ theme: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemesActions.updateRequest),
            switchMap(({ id, theme }) => {
                return this._apiService.updateAppTheme(id, formatAppThemeModel(theme)).pipe(
                    mergeMap(res => {
                        return [AppThemesActions.updateSuccess({ theme: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(AppThemesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteAppTheme(id).pipe(
                    mergeMap(res => {
                        return [AppThemesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(AppThemesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
