import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LicensesActions } from '@store/actions/licenses.action';
import { LicensesSelectors } from '@store/selectors/licenses.selectors';
import { LicenseActions } from '@store/actions/license.action';
import { IAccount, IIntegration, ILicense, IRef } from '@djonnyx/tornado-types';
import { AccountsSelectors, IntegrationsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { AccountsActions } from '@store/actions/accounts.action';

@Component({
  selector: 'ta-licenses-editor',
  templateUrl: './licenses-editor.container.html',
  styleUrls: ['./licenses-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILicense>>;

  public integrations$: Observable<Array<IIntegration>>;

  public accounts$: Observable<Array<IAccount>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LicensesSelectors.selectLoading),
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
      select(LicensesSelectors.selectCollection),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(LicensesSelectors.selectRefInfo),
    );

    this._store.dispatch(LicensesActions.getAllRequest());
    this._store.dispatch(AccountsActions.getAllRequest());
    this._store.dispatch(IntegrationsActions.getAllRequest());
  }

  onCreate(): void {

    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(license: ILicense): void {

    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: license.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onView(license: ILicense): void {

    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: license.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(license: ILicense): void {
    // this._store.dispatch(LicensesActions.updateRequest({id: license.id, license}));
  }

  onDelete(id: string): void {
    // this._store.dispatch(LicensesActions.deleteRequest({ id }));
  }
}
