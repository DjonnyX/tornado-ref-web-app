import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { TerminalActions } from '@store/actions/terminal.action';
import { TerminalSelectors } from '@store/selectors/terminal.selectors';
import { ITerminal, IStore } from '@djonnyx/tornado-types';
import { StoresSelectors } from '@store/selectors';
import { StoresActions } from '@store/actions/stores.action';

@Component({
  selector: 'ta-terminal-creator',
  templateUrl: './terminal-creator.container.html',
  styleUrls: ['./terminal-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _terminal: ITerminal;

  terminal$: Observable<ITerminal>;

  stores$: Observable<Array<IStore>>;

  isEditMode = false;

  private _terminalId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._terminalId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._terminalId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(TerminalSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TerminalSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isTerminalGetProcess, selectIsUpdateProcess, isStoresGetProcess]) => isTerminalGetProcess || selectIsUpdateProcess || isStoresGetProcess),
    );

    this.terminal$ = this._store.pipe(
      select(TerminalSelectors.selectEntity),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.terminal$.pipe(
      takeUntil(this.unsubscribe$),
      filter(terminal => !!terminal),
      filter(terminal => this._terminalId !== terminal.id),
    ).subscribe(terminal => {
      this._terminalId = terminal.id;
      this.isEditMode = !!this._terminalId;
    });

    if (!!this._terminalId) {
      this._store.dispatch(TerminalActions.getRequest({ id: this._terminalId }));
    }

    this._store.dispatch(StoresActions.getAllRequest());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(TerminalActions.clear());
  }

  onSubmit(terminal: ITerminal): void {
    if (this.isEditMode) {
      this._store.dispatch(TerminalActions.updateRequest({ id: terminal.id, terminal }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
