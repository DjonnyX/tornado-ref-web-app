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
import { IntegrationsSelectors, LicenseTypesSelectors, StoresSelectors, TerminalsSelectors } from '@store/selectors';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { TerminalsActions } from '@store/actions/terminals.action';
import { StoresActions } from '@store/actions/stores.action';

@Component({
  selector: 'ta-license-account-creator',
  templateUrl: './license-account-creator.container.html',
  styleUrls: ['./license-account-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseAccountCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _license: ILicenseAccount;

  license$: Observable<ILicenseAccount>;

  licenseTypes$: Observable<Array<ILicenseType>>;

  integrations$: Observable<Array<IIntegration>>;

  terminals$: Observable<Array<ITerminal>>;

  stores$: Observable<Array<IStore>>;

  private _licenseId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._licenseId = this._activatedRoute.snapshot.queryParams["id"];

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicenseAccountSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseTypesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TerminalsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicenseAccountGetProcess, isStoresGetProcess,
        isLicenseTypesGetProcess, isIntegrationsGetProcess,
        isTerminalsGetProcess]) =>
        isLicenseAccountGetProcess || isStoresGetProcess ||
        isLicenseTypesGetProcess || isIntegrationsGetProcess ||
        isTerminalsGetProcess),
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

    this.terminals$ = this._store.pipe(
      select(TerminalsSelectors.selectCollection),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.license$.pipe(
      takeUntil(this.unsubscribe$),
      filter(license => !!license),
      filter(license => this._licenseId !== license.id),
    ).subscribe(license => {
      this._licenseId = license.id;
    });

    if (!!this._licenseId) {
      this._store.dispatch(LicenseAccountActions.getRequest({ id: this._licenseId }));
    }

    this._store.dispatch(LicenseTypesActions.getAllRequest());
    this._store.dispatch(IntegrationsActions.getAllRequest());
    this._store.dispatch(TerminalsActions.getAllRequest());
    this._store.dispatch(StoresActions.getAllRequest());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LicenseAccountActions.clear());
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
