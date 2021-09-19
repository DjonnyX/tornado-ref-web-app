import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { StoreSelectors } from '@store/selectors/store.selectors';
import { IAccount, IAccountInfo, IIntegration } from '@djonnyx/tornado-types';
import { IntegrationsSelectors, TerminalsSelectors, UserSelectors } from '@store/selectors';
import { IUserProfile } from '@models';
import { UserActions } from '@store/actions/user.action';
import { AccountsActions } from '@store/actions/accounts.action';
import { IntegrationsActions } from '@store/actions/integrations.action';
import { IStoreRequest } from '@store/interfaces/store-request.interface';

@Component({
  selector: 'ta-profile',
  templateUrl: './profile.container.html',
  styleUrls: ['./profile.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  accounts$: Observable<Array<IAccountInfo>>;

  integrations$: Observable<Array<IIntegration>>;

  profile$: Observable<IUserProfile>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(StoreSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoreSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(TerminalsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(IntegrationsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      takeUntil(this.unsubscribe$),
      map(([isStoreGetProcess, isStoreUpdateProcess, isTerminalsGetProcess, isIntegrationsGetProcess]) =>
        isStoreGetProcess || isStoreUpdateProcess || isTerminalsGetProcess || isIntegrationsGetProcess),
    );

    this.profile$ = this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(UserSelectors.selectUserProfile),
    );

    this.integrations$ = this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(IntegrationsSelectors.selectCollection),
    );

    this._store.dispatch(IntegrationsActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(AccountsActions.clear());
    this._store.dispatch(IntegrationsActions.clear());
  }

  onSaveUserInfo(request: IStoreRequest<{ id: string, data: IAccount }, IAccount>): void {
    this._store.dispatch(UserActions.userUpdateProfileRequest(request));
  }
}
