import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TranslationsActions } from '@store/actions/translations.action';
import { formatTranslationModel } from '@app/utils/translation.util';

@Injectable()
export default class TranslationsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TranslationsActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getTranslations().pipe(
                    mergeMap(res => {
                        return [TranslationsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(TranslationsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TranslationsActions.updateRequest),
            switchMap(({ id, translation }) => {
                return this._apiService.updateTranslation(id, formatTranslationModel(translation)).pipe(
                    mergeMap(res => {
                        return [TranslationsActions.updateSuccess({ translation: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.notify(error.message);
                        return of(TranslationsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
