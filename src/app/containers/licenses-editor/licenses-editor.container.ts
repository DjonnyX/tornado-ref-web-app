import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LicensesActions } from '@store/actions/licenses.action';
import { LicensesSelectors } from '@store/selectors/licenses.selectors';
import { LicenseActions } from '@store/actions/license.action';
import { DefaultRoleTypes, IAccount, IIntegration, ILicense, IRef } from '@djonnyx/tornado-types';
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
export class LicensesEditorContainer implements OnInit, OnDestroy {

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

    this._store.dispatch(LicensesActions.getAllRequest({}));
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
    this._store.dispatch(IntegrationsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    this._store.dispatch(LicensesActions.clear());
    this._store.dispatch(AccountsActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
  }

  onCreate(): void {

    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(license: ILicense): void {
    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: license.id, },
    });
  }

  onView(license: ILicense): void {
    this._store.dispatch(LicenseActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: license.id, },
    });
  }

  onUpdate(license: ILicense): void {
    // this._store.dispatch(LicensesActions.updateRequest({id: license.id, license}));
  }

  onDelete(id: string): void {
    // this._store.dispatch(LicensesActions.deleteRequest({ id }));
  }
}
