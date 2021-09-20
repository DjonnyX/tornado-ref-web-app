import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LicenseActions } from '@store/actions/license.action';
import { LicenseSelectors } from '@store/selectors/license.selectors';
import { DefaultRoleTypes, IAccount, IIntegration, ILicenseAccount, ILicenseType, IStore, ITerminal } from '@djonnyx/tornado-types';
import {
  AccountsSelectors, IntegrationsSelectors, LicenseTypesSelectors,
  StoreSelectors, TerminalSelectors,
} from '@store/selectors';
import { LicenseTypesActions } from '@store/actions/license-types.action';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { AccountsActions } from '@store/actions/accounts.action';
import { TerminalActions } from '@store/actions/terminal.action';
import { StoreActions } from '@store/actions/store.action';

@Component({
  selector: 'ta-license-creator',
  templateUrl: './license-creator.container.html',
  styleUrls: ['./license-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  license$: Observable<ILicenseAccount>;

  licenseTypes$: Observable<Array<ILicenseType>>;

  integrations$: Observable<Array<IIntegration>>;

  accounts$: Observable<Array<IAccount>>;

  terminal$: Observable<ITerminal>;

  store$: Observable<IStore>;

  isEditMode = false;

  private _licenseId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._licenseId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._licenseId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicenseSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LicenseSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(LicenseSelectors.selectIsUpdateProcess),
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
        select(AccountsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TerminalSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicenseGetProcess, isLicenseCreateProcess, isLicenseUpdateProcess, isStoreGetProcess,
        isLicenseTypesGetProcess, isIntegrationsGetProcess, isAccountsGetProcess, isTerminalGetProcess]) =>
        isLicenseGetProcess || isLicenseCreateProcess || isLicenseUpdateProcess || isStoreGetProcess ||
        isLicenseTypesGetProcess || isIntegrationsGetProcess || isAccountsGetProcess || isTerminalGetProcess),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.licenseTypes$ = this._store.pipe(
      select(LicenseTypesSelectors.selectCollection),
    );

    this.license$ = this._store.pipe(
      select(LicenseSelectors.selectEntity),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
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
      this.isEditMode = !!this._licenseId;

      if (!!license.terminalId) {
        this._store.dispatch(TerminalActions.getRequest({ id: license.terminalId }));
      }
    });

    if (!!this._licenseId) {
      this._store.dispatch(LicenseActions.getRequest({ id: this._licenseId }));
    }

    this._store.dispatch(LicenseTypesActions.getAllRequest({}));
    this._store.dispatch(IntegrationsActions.getAllRequest({}));
    this._store.dispatch(AccountsActions.getAllRequest({
      options: {
        filter: [
          {
            id: "roleType",
            value: DefaultRoleTypes.OWNER,
            operation: "equals",
          },
        ],
        queryParams: {
          all: "true",
        }
      }
    }));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LicenseActions.clear());
    this._store.dispatch(TerminalActions.clear());
    this._store.dispatch(StoreActions.clear());
    this._store.dispatch(LicenseTypesActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
    this._store.dispatch(AccountsActions.clear());
  }

  onSubmit(license: ILicenseAccount): void {
    if (this.isEditMode) {
      this._store.dispatch(LicenseActions.updateRequest({ id: license.id, license }));
    } else {
      this._store.dispatch(LicenseActions.createRequest({ license }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/licenses"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/licenses"]);
  }
}
