import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { SubscriptionActions } from '@store/actions/subscription.action';
import { SubscriptionSelectors } from '@store/selectors/subscription.selectors';
import { DefaultRoleTypes, IAccount, IIntegration, ISubscription, ITarif, IStore, ILicense } from '@djonnyx/tornado-types';
import {
  AccountsSelectors, IntegrationsSelectors, TarifsSelectors,
  StoreSelectors, TerminalSelectors, LicensesSelectors,
} from '@store/selectors';
import { TarifsActions } from '@store/actions/tarifs.action';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { AccountsActions } from '@store/actions/accounts.action';
import { StoreActions } from '@store/actions/store.action';
import { LicensesActions } from '@store/actions/licenses.action';

@Component({
  selector: 'ta-subscription-creator',
  templateUrl: './subscription-creator.container.html',
  styleUrls: ['./subscription-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  subscription$: Observable<ISubscription>;

  tarifs$: Observable<Array<ITarif>>;

  integrations$: Observable<Array<IIntegration>>;

  licenses$: Observable<Array<ILicense>>;

  accounts$: Observable<Array<IAccount>>;

  store$: Observable<IStore>;

  isEditMode = false;

  private _subscriptionId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._subscriptionId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._subscriptionId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(SubscriptionSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SubscriptionSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(SubscriptionSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(StoreSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TarifsSelectors.selectIsGetProcess),
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
      map(([isSubscriptionGetProcess, isSubscriptionCreateProcess, isSubscriptionUpdateProcess, isStoreGetProcess,
        isTarifsGetProcess, isIntegrationsGetProcess, isAccountsGetProcess, isTerminalGetProcess]) =>
        isSubscriptionGetProcess || isSubscriptionCreateProcess || isSubscriptionUpdateProcess || isStoreGetProcess ||
        isTarifsGetProcess || isIntegrationsGetProcess || isAccountsGetProcess || isTerminalGetProcess),
    );

    this.integrations$ = this._store.pipe(
      select(IntegrationsSelectors.selectCollection),
    );

    this.licenses$ = this._store.pipe(
      select(LicensesSelectors.selectCollection),
    );

    this.tarifs$ = this._store.pipe(
      select(TarifsSelectors.selectCollection),
    );

    this.subscription$ = this._store.pipe(
      select(SubscriptionSelectors.selectEntity),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
    );

    this.store$ = this._store.pipe(
      select(StoreSelectors.selectEntity),
    );

    this.subscription$.pipe(
      takeUntil(this.unsubscribe$),
      filter(subscription => !!subscription),
    ).subscribe(subscription => {
      this._subscriptionId = subscription.id;
      this.isEditMode = !!this._subscriptionId;

      if (!!this._subscriptionId) {
        this._store.dispatch(LicensesActions.getAllRequest({
          options: {
            filter: [
              {
                id: "subscriptionId",
                operation: "equals",
                value: this._subscriptionId,
              }
            ]
          }
        }));
      }
    });

    if (!!this._subscriptionId) {
      this._store.dispatch(SubscriptionActions.getRequest({ id: this._subscriptionId, extended: true }));
      this._store.dispatch(LicensesActions.getAllRequest({
        options: {
          filter: [
            {
              id: "subscriptionId",
              operation: "equals",
              value: this._subscriptionId,
            }
          ]
        }
      }));
    }

    this._store.dispatch(TarifsActions.getAllRequest({}));
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

    this._store.dispatch(SubscriptionActions.clear());
    this._store.dispatch(StoreActions.clear());
    this._store.dispatch(TarifsActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
    this._store.dispatch(AccountsActions.clear());
    this._store.dispatch(LicensesActions.clear());
  }

  onSubmit(subscription: ISubscription): void {
    if (this.isEditMode) {
      this._store.dispatch(SubscriptionActions.updateRequest({ id: subscription.id, subscription }));
    } else {
      this._store.dispatch(SubscriptionActions.createRequest({ subscription }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/subscriptions"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/subscriptions"]);
  }
}
