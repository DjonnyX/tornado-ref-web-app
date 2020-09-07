import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TranslationActions } from '@store/actions/translation.action';
import { formatTranslationModel } from '@app/utils/translation.util';

@Injectable()
export default class TranslationEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TranslationActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getTranslation(id).pipe(
                    mergeMap(res => {
                        return [TranslationActions.getSuccess({ translation: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TranslationActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TranslationActions.updateRequest),
            switchMap(({ id, translation }) => {
                return this._apiService.updateTranslation(id, formatTranslationModel(translation)).pipe(
                    mergeMap(res => {
                        return [TranslationActions.updateSuccess({ translation: res.data })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TranslationActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
