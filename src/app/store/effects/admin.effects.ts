import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { mergeMap, take } from "rxjs/operators";
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { AdminActions } from '@store/actions/admin.action';
import { AdminSelectors } from '@store/selectors';

@Injectable()
export default class AdminEffects {
    constructor(private _actions$: Actions, private _store: Store<IAppState>) { }

    public readonly adminToggleSidenav = createEffect(() =>
        this._actions$.pipe(
            ofType(AdminActions.toggleSideNav),
            mergeMap(() =>
                this._store.pipe(
                    select(AdminSelectors.selectSidenavIsOpen),
                    take(1)
                )
            ),
            mergeMap(v => [AdminActions.setSidenavOpen({ sidenavIsOpen: !v })])
        )
    );
}
