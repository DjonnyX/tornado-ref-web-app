import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, mergeMap, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { ApiService } from "@services";
import { IAppState } from '@store/state';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TerminalActions } from '@store/actions/terminal.action';
import { formatTerminalModel } from '@app/utils/terminal.util';

@Injectable()
export default class TerminalEffects {
    constructor(private _actions$: Actions, private _apiService: ApiService, private _store: Store<IAppState>,
        private _router: Router, private _notificationService: NotificationService) { }

    public readonly getRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TerminalActions.getRequest),
            switchMap(({id}) => {
                return this._apiService.getTerminal(id).pipe(
                    mergeMap(res => {
                        return [TerminalActions.getSuccess({ terminal: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TerminalActions.getError({ error: error.message }));
                    }),
                );
            })
        )
    );

    public readonly updateRequest = createEffect(() =>
        this._actions$.pipe(
            ofType(TerminalActions.updateRequest),
            switchMap(({ id, terminal }) => {
                return this._apiService.updateTerminal(id, formatTerminalModel(terminal)).pipe(
                    mergeMap(res => {
                        return [TerminalActions.updateSuccess({ terminal: res.data })];
                    }),
                    catchError((error: Error) => {
                        this._notificationService.error(error.message);
                        return of(TerminalActions.updateError({ error: error.message }));
                    }),
                );
            })
        )
    );
}
