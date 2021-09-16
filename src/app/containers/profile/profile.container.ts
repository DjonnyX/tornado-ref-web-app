import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { StoreSelectors } from '@store/selectors/store.selectors';
import { IAccount, IAccountInfo, IStore } from '@djonnyx/tornado-types';
import { AccountsSelectors, TerminalsSelectors, UserSelectors } from '@store/selectors';
import { IUserProfile } from '@models';
import { UserActions } from '@store/actions/user.action';
import { AccountsActions } from '@store/actions/accounts.action';
import { IUserUpdateProfileRequest } from '@services';

@Component({
  selector: 'ta-profile',
  templateUrl: './profile.container.html',
  styleUrls: ['./profile.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  isAccountProcess$: Observable<boolean>;

  accounts$: Observable<Array<IAccountInfo>>;

  profile$: Observable<IUserProfile>;

  private _profile: IUserProfile;

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
    ]).pipe(
      takeUntil(this.unsubscribe$),
      map(([isStoreGetProcess, isStoreUpdateProcess, isTerminalsGetProcess]) =>
        isStoreGetProcess || isStoreUpdateProcess || isTerminalsGetProcess),
    );

    this.isAccountProcess$ = this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(UserSelectors.selectIsUpdateUserProfileProcess),
    );

    this.profile$ = this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(UserSelectors.selectUserProfile),
    );

    this.profile$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(v => {
      this._profile = v;
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(AccountsActions.clear());
  }

  onSaveUserInfo(profileInfo: IUserUpdateProfileRequest): void {
    this._store.dispatch(UserActions.userUpdateProfileRequest({
      id: this._profile.account.id,
      data: {
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
      } as IAccount,
    }));
  }
}
