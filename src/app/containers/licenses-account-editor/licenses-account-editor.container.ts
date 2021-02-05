import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LicensesAccountActions } from '@store/actions/licenses-account.action';
import { LicensesAccountSelectors } from '@store/selectors/licenses-account.selectors';
import { LicenseActions } from '@store/actions/license.action';
import { IAccount, IIntegration, ILicense, IRef } from '@djonnyx/tornado-types';
import { AccountsSelectors, IntegrationsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { AccountsActions } from '@store/actions/accounts.action';

@Component({
  selector: 'ta-licenses-account-editor',
  templateUrl: './licenses-account-editor.container.html',
  styleUrls: ['./licenses-account-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesAccountEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILicense>>;

  public integrations$: Observable<Array<IIntegration>>;

  public accounts$: Observable<Array<IAccount>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicensesAccountSelectors.selectLoading),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AccountsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isLicenseLoading, isIntegrationsLoading, isAccountsGetProcess]) =>
        isLicenseLoading || isIntegrationsLoading || isAccountsGetProcess)
    );

    this.collection$ = this._store.pipe(
      select(LicensesAccountSelectors.selectCollection),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(LicensesAccountSelectors.selectRefInfo),
    );

    this._store.dispatch(LicensesAccountActions.getAllRequest({}));
    this._store.dispatch(AccountsActions.getAllRequest({}));
    this._store.dispatch(IntegrationsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    this._store.dispatch(LicensesAccountActions.clear());
    this._store.dispatch(AccountsActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
  }

  onView(license: ILicense): void {
    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: license.id, },
    });
  }
}
