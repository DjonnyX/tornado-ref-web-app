import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LanguageActions } from '@store/actions/language.action';
import { formatLanguageModel } from '@app/utils/language.util';

@Injectable()
export default class LanguageEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getLanguage(id).pipe(
                    mergeMap(res => {
                        return [LanguageActions.getSuccess({ language: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageActions.createRequest),
            switchMap(({language}) => {
                return this._apiService.createLanguage(formatLanguageModel(language)).pipe(
                    mergeMap(res => {
                        return [LanguageActions.createSuccess({ language: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguageActions.updateRequest),
            switchMap(({ id, language }) => {
                return this._apiService.updateLanguage(id, formatLanguageModel(language)).pipe(
                    mergeMap(res => {
                        return [LanguageActions.updateSuccess({ language: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(LanguageActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
