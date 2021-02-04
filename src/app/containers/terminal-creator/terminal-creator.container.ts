import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { TerminalActions } from '@store/actions/terminal.action';
import { TerminalSelectors } from '@store/selectors/terminal.selectors';
import { ITerminal, IStore, ILicenseAccount } from '@djonnyx/tornado-types';
import { LicenseAccountSelectors, StoreSelectors, StoresSelectors } from '@store/selectors';
import { StoresActions } from '@store/actions/stores.action';
import { StoreActions } from '@store/actions/store.action';
import { LicenseAccountActions } from '@store/actions/license-account.action';

@Component({
  selector: 'ta-terminal-creator',
  templateUrl: './terminal-creator.container.html',
  styleUrls: ['./terminal-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  terminal$: Observable<ITerminal>;

  stores$: Observable<Array<IStore>>;

  store$: Observable<IStore>;

  license$: Observable<ILicenseAccount>;

  isEditMode = false;

  private _terminalId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
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
      this._store.pipe(
        select(StoreSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseAccountSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isTerminalGetProcess, selectIsUpdateProcess, isStoresGetProcess, isStoreGetProcess, isLicenseGetProcess]) =>
      isTerminalGetProcess || selectIsUpdateProcess || isStoresGetProcess || isStoreGetProcess || isLicenseGetProcess),
    );

    this.terminal$ = this._store.pipe(
      select(TerminalSelectors.selectEntity),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.store$ = this._store.pipe(
      select(StoreSelectors.selectEntity),
    );

    this.license$ = this._store.pipe(
      select(LicenseAccountSelectors.selectEntity),
    );

    this.terminal$.pipe(
      takeUntil(this.unsubscribe$),
      filter(terminal => !!terminal),
    ).subscribe(terminal => {
      this._terminalId = terminal.id;
      this.isEditMode = !!this._terminalId;

      if (!!terminal.storeId) {
        this._store.dispatch(StoreActions.getRequest({ id: terminal.storeId }));
      }

      if (!!terminal.licenseId) {
        this._store.dispatch(LicenseAccountActions.getRequest({ id: terminal.licenseId }));
      }
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
    this._router.navigate(["/admin/terminals"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/terminals"]);
  }
}
