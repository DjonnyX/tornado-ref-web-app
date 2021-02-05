import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { TerminalsActions } from '@store/actions/terminals.action';
import { TerminalsSelectors } from '@store/selectors/terminals.selectors';
import { TerminalActions } from '@store/actions/terminal.action';
import { ITerminal, IRef, IStore } from '@djonnyx/tornado-types';
import { map } from 'rxjs/operators';
import { StoresSelectors } from '@store/selectors';
import { StoresActions } from '@store/actions/stores.action';

@Component({
  selector: 'ta-terminals-editor',
  templateUrl: './terminals-editor.container.html',
  styleUrls: ['./terminals-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ITerminal>>;

  public stores$: Observable<Array<IStore>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(TerminalsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(StoresSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isTerminalsLoading, isStoresLoading]) =>
        isTerminalsLoading || isStoresLoading)
    );

    this.collection$ = this._store.pipe(
      select(TerminalsSelectors.selectCollection),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(TerminalsSelectors.selectRefInfo),
    );

    this._store.dispatch(TerminalsActions.getAllRequest({}));
    this._store.dispatch(StoresActions.getAllRequest());
  }

  onCreate(): void {
    this._store.dispatch(TerminalActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(terminal: ITerminal): void {
    this._store.dispatch(TerminalActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: terminal.id, },
    });
  }

  onUpdate(terminal: ITerminal): void {
    this._store.dispatch(TerminalsActions.updateRequest({ id: terminal.id, terminal }));
  }

  onDelete(id: string): void {
    this._store.dispatch(TerminalsActions.deleteRequest({ id }));
  }
}
