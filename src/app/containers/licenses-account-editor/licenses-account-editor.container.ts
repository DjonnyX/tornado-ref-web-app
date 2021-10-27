import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LicensesAccountActions } from '@store/actions/licenses-account.action';
import { LicensesAccountSelectors } from '@store/selectors/licenses-account.selectors';
import { LicenseActions } from '@store/actions/license.action';
import { IAccount, ILicense, ILicenseAccount, IRef } from '@djonnyx/tornado-types';
import { AccountsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { AccountsActions } from '@store/actions/accounts.action';

@Component({
  selector: 'ta-licenses-account-editor',
  templateUrl: './licenses-account-editor.container.html',
  styleUrls: ['./licenses-account-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesAccountEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isGetCollectionProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILicense>>;

  public accounts$: Observable<Array<IAccount>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicensesAccountSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AccountsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isLicenseLoading, isAccountsGetProcess]) =>
        isLicenseLoading || isAccountsGetProcess)
    );
    
    this.isGetCollectionProcess$ = combineLatest([
      this._store.pipe(
        select(LicensesAccountSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AccountsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicenseGetProcess, isAccountsGetProcess]) =>
        isLicenseGetProcess || isAccountsGetProcess)
    );

    this.collection$ = this._store.pipe(
      select(LicensesAccountSelectors.selectCollection),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(LicensesAccountSelectors.selectRefInfo),
    );

    this._store.dispatch(LicensesAccountActions.getAllRequest({}));
    this._store.dispatch(AccountsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    this._store.dispatch(LicensesAccountActions.clear());
    this._store.dispatch(AccountsActions.clear());
  }

  onView(license: ILicenseAccount): void {
    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: license.id, },
    });
  }

  onUnbind(id: string): void {
    this._store.dispatch(LicensesAccountActions.unbindRequest({ id }));
  }
}
