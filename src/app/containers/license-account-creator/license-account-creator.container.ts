import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LicenseAccountActions } from '@store/actions/license-account.action';
import { LicenseAccountSelectors } from '@store/selectors/license-account.selectors';
import { IAccount, IIntegration, ILicenseAccount, ILicenseType, IStore } from '@djonnyx/tornado-types';
import { AccountsSelectors, IntegrationsSelectors, LicenseTypesSelectors, StoresSelectors } from '@store/selectors';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { AccountsActions } from '@store/actions/accounts.action';

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

  accounts$: Observable<Array<IAccount>>;

  stores$: Observable<Array<IStore>>;

  isEditMode = false;

  private _licenseId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._licenseId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._licenseId;

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
        select(AccountsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicenseAccountGetProcess, isStoresGetProcess,
        isLicenseTypesGetProcess, isIntegrationsGetProcess, isAccountsGetProcess]) =>
        isLicenseAccountGetProcess || isStoresGetProcess ||
        isLicenseTypesGetProcess || isIntegrationsGetProcess || isAccountsGetProcess),
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

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
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
      this.isEditMode = !!this._licenseId;
    });

    if (!!this._licenseId) {
      this._store.dispatch(LicenseAccountActions.getRequest({ id: this._licenseId }));
    }

    this._store.dispatch(LicenseTypesActions.getAllRequest());
    this._store.dispatch(IntegrationsActions.getAllRequest());
    this._store.dispatch(AccountsActions.getAllRequest());
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
