import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { TerminalsActions } from '@store/actions/terminals.action';
import { TerminalsSelectors } from '@store/selectors/terminals.selectors';
import { TerminalActions } from '@store/actions/terminal.action';
import { ITerminal, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-terminals-editor',
  templateUrl: './terminals-editor.container.html',
  styleUrls: ['./terminals-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ITerminal>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(TerminalsActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(TerminalsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(TerminalsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(TerminalsSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(TerminalActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(terminal: ITerminal): void {

    this._store.dispatch(TerminalActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: terminal.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(terminal: ITerminal): void {
    this._store.dispatch(TerminalsActions.updateRequest({id: terminal.id, terminal}));
  }

  onDelete(id: string): void {
    this._store.dispatch(TerminalsActions.deleteRequest({ id }));
  }
}
