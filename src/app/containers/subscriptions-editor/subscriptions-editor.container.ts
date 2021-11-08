import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionsActions } from '@store/actions/subscriptions.action';
import { SubscriptionsSelectors } from '@store/selectors/subscriptions.selectors';
import { SubscriptionActions } from '@store/actions/subscription.action';
import { DefaultRoleTypes, IAccount, ISubscription, IRef } from '@djonnyx/tornado-types';
import { AccountsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { AccountsActions } from '@store/actions/accounts.action';

@Component({
  selector: 'ta-subscriptions-editor',
  templateUrl: './subscriptions-editor.container.html',
  styleUrls: ['./subscriptions-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ISubscription>>;

  public accounts$: Observable<Array<IAccount>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(SubscriptionsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AccountsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isSubscriptionLoading, isAccountsGetProcess]) =>
        isSubscriptionLoading || isAccountsGetProcess)
    );

    this.collection$ = this._store.pipe(
      select(SubscriptionsSelectors.selectCollection),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(SubscriptionsSelectors.selectRefInfo),
    );

    this._store.dispatch(SubscriptionsActions.getAllRequest({
      options: {
        queryParams: {
          "withoutIntegrationServerInfo": "false",
        }
      }
    }));
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
    this._store.dispatch(SubscriptionsActions.clear());
    this._store.dispatch(AccountsActions.clear());
  }

  onCreate(): void {

    this._store.dispatch(SubscriptionActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(subscription: ISubscription): void {
    this._store.dispatch(SubscriptionActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: subscription.id, },
    });
  }

  onView(subscription: ISubscription): void {
    this._store.dispatch(SubscriptionActions.clear());

    this._router.navigate(["view"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: subscription.id, },
    });
  }

  onUpdate(subscription: ISubscription): void {
    this._store.dispatch(SubscriptionsActions.updateRequest({id: subscription.id, subscription}));
  }

  onDelete(id: string): void {
    this._store.dispatch(SubscriptionsActions.deleteRequest({ id }));
  }
}
