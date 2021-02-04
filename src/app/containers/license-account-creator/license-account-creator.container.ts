import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LicenseAccountActions } from '@store/actions/license-account.action';
import { LicenseAccountSelectors } from '@store/selectors/license-account.selectors';
import { IIntegration, ILicenseAccount, ILicenseType, IStore, ITerminal } from '@djonnyx/tornado-types';
import { IntegrationsSelectors, LicenseTypesSelectors, StoreSelectors, TerminalSelectors } from '@store/selectors';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { StoreActions } from '@store/actions/store.action';
import { TerminalActions } from '@store/actions/terminal.action';

@Component({
  selector: 'ta-license-account-creator',
  templateUrl: './license-account-creator.container.html',
  styleUrls: ['./license-account-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseAccountCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  license$: Observable<ILicenseAccount>;

  licenseTypes$: Observable<Array<ILicenseType>>;

  integrations$: Observable<Array<IIntegration>>;

  terminal$: Observable<ITerminal>;

  store$: Observable<IStore>;

  private _licenseId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._licenseId = this._activatedRoute.snapshot.queryParams["id"];

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicenseAccountSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoreSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseTypesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TerminalSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicenseAccountGetProcess, isStoreGetProcess,
        isLicenseTypesGetProcess, isIntegrationsGetProcess,
        isTerminalGetProcess]) =>
        isLicenseAccountGetProcess || isStoreGetProcess ||
        isLicenseTypesGetProcess || isIntegrationsGetProcess ||
        isTerminalGetProcess),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.licenseTypes$ = this._store.pipe(
      select(LicenseTypesSelectors.selectCollection),
    );

    this.license$ = this._store.pipe(
      select(LicenseAccountSelectors.selectEntity),
    );
    
    this.terminal$ = this._store.pipe(
      select(TerminalSelectors.selectEntity),
    );

    this.terminal$.pipe(
      takeUntil(this.unsubscribe$),
      filter(t => !!t),
    ).subscribe(terminal => {
      if (!!terminal.storeId) {
        this._store.dispatch(StoreActions.getRequest({ id: terminal.storeId }));
      }
    });

    this.store$ = this._store.pipe(
      select(StoreSelectors.selectEntity),
    );

    this.license$.pipe(
      takeUntil(this.unsubscribe$),
      filter(license => !!license),
    ).subscribe(license => {
      this._licenseId = license.id;

      if (!!license.terminalId) {
        this._store.dispatch(TerminalActions.getRequest({ id: license.terminalId }));
      }
    });

    if (!!this._licenseId) {
      this._store.dispatch(LicenseAccountActions.getRequest({ id: this._licenseId }));
    }

    this._store.dispatch(LicenseTypesActions.getAllRequest());
    this._store.dispatch(IntegrationsActions.getAllRequest());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LicenseAccountActions.clear());
  }

  onCancel(): void {
    this._router.navigate(["../", {
      relativeTo: this._activatedRoute,
    }]);
  }

  onToBack(): void {
    this._router.navigate(["../", {
      relativeTo: this._activatedRoute,
    }]);
  }
}
