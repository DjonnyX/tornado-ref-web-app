import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { LanguagesActions } from '@store/actions/languages.action';
import { formatLanguageModel } from '@app/utils/language.util';

@Injectable()
export default class LanguagesEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguagesActions.getAllRequest),
            switchMap(({ options }) => {
                return this._apiService.getLanguages(options).pipe(
                    mergeMap(res => {
                        return [LanguagesActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LanguagesActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguagesActions.createRequest),
            switchMap(({ language }) => {
                return this._apiService.createLanguage(formatLanguageModel(language)).pipe(
                    mergeMap(res => {
                        return [LanguagesActions.createSuccess({ language: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LanguagesActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguagesActions.updateRequest),
            switchMap(({ id, language, setDafault }) => {
                return this._apiService.updateLanguage(id, formatLanguageModel(language)).pipe(
                    mergeMap(res => {
                        if (setDafault) {
                            this._store.dispatch(LanguagesActions.getAllRequest());
                            return [LanguagesActions.updateSuccess({ language: res.data, meta: res.meta })];
                        }
                        return [LanguagesActions.updateSuccess({ language: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LanguagesActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(LanguagesActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteLanguage(id).pipe(
                    mergeMap(res => {
                        return [LanguagesActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(LanguagesActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
