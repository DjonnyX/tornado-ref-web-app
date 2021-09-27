import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { SelectorActions } from '@store/actions/selector.action';
import { formatSelectorModel } from '@app/utils/selector.util';

@Injectable()
export default class SelectorEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorActions.getRequest),
            switchMap(({ id }) => {
                return this._apiService.getSelector(id).pipe(
                    mergeMap(res => {
                        return [SelectorActions.getSuccess({ selector: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SelectorActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly createRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorActions.createRequest),
            switchMap(({ selector }) => {
                return this._apiService.createSelector(formatSelectorModel(selector)).pipe(
                    mergeMap(res => {
                        return [SelectorActions.createSuccess({ selector: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SelectorActions.createError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(SelectorActions.updateRequest),
            switchMap(({ id, selector }) => {
                return this._apiService.updateSelector(id, formatSelectorModel(selector)).pipe(
                    mergeMap(res => {
                        return [SelectorActions.updateSuccess({ selector: res.data })];
                    }),
                    catchError((error: Error) => {
                        return of(SelectorActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
