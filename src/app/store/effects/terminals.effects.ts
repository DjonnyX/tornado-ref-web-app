import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TerminalsActions } from '@store/actions/terminals.action';
import { formatTerminalModel } from '@app/utils/terminal.util';

@Injectable()
export default class TerminalsEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getAllRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TerminalsActions.getAllRequest),
            switchMap(params => {
                return this._apiService.getTerminals().pipe(
                    mergeMap(res => {
                        return [TerminalsActions.getAllSuccess({ collection: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TerminalsActions.getAllError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TerminalsActions.updateRequest),
            switchMap(({ id, terminal }) => {
                return this._apiService.updateTerminal(id, formatTerminalModel(terminal)).pipe(
                    mergeMap(res => {
                        return [TerminalsActions.updateSuccess({ terminal: res.data, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TerminalsActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly deleteRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TerminalsActions.deleteRequest),
            switchMap(({ id }) => {
                return this._apiService.deleteTerminal(id).pipe(
                    mergeMap(res => {
                        return [TerminalsActions.deleteSuccess({ id, meta: res.meta })];
                    }),
                    map(v => v),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TerminalsActions.deleteError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
