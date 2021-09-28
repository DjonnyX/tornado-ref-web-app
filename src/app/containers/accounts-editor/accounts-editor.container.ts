import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { DefaultRoleTypes, IAccount, IRef } from '@djonnyx/tornado-types';
import { AccountsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { AccountsActions } from '@store/actions/accounts.action';
import { AccountActions } from '@store/actions/account.action';

@Component({
  selector: 'ta-accounts-editor',
  templateUrl: './accounts-editor.container.html',
  styleUrls: ['./accounts-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isGetCollectionProcess$: Observable<boolean>;

  public collection$: Observable<Array<IAccount>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(AccountsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AccountsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(AccountsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isAccountsGetProcess, isAccountsUpdateProcess, isAccountDeleteProcess]) =>
        isAccountsGetProcess || isAccountsUpdateProcess || isAccountDeleteProcess
      ),
    );
    
    this.isGetCollectionProcess$ = combineLatest([
      this._store.pipe(
        select(AccountsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isAccountsGetProcess]) =>
        isAccountsGetProcess
      ),
    );

    this.collection$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(AccountsSelectors.selectRefInfo),
    );

    this._store.dispatch(AccountsActions.getAllRequest({
      options: {
        filter: [
          {
            id: "roleType",
            value: `${DefaultRoleTypes.ADMIN},${DefaultRoleTypes.OWNER}`,
            operation: "notequals",
          },
        ],
      }
    }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(AccountsActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(AccountsActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(account: IAccount): void {
    this._store.dispatch(AccountActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: account.id, },
    });
  }

  onView(account: IAccount): void {
    this._store.dispatch(AccountActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: account.id, },
    });
  }

  onUpdate(account: IAccount): void {
    this._store.dispatch(AccountsActions.updateRequest({ id: account.id, account }));
  }

  onDelete(id: string): void {
    this._store.dispatch(AccountsActions.deleteRequest({ id }));
  }
}
