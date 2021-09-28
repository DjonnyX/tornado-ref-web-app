import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { AccountActions } from '@store/actions/account.action';
import { AccountSelectors } from '@store/selectors/account.selectors';
import { DefaultRoleTypes, IAccount, IRole } from '@djonnyx/tornado-types';
import {
  RolesSelectors,
} from '@store/selectors';
import { IAccountCreateRequest } from '@app/services/interfaces';
import { RolesActions } from '@store/actions/roles.action';
import { ApiService } from '@services';
import { ICaptcha } from '@models';

@Component({
  selector: 'ta-account-creator',
  templateUrl: './account-creator.container.html',
  styleUrls: ['./account-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  account$: Observable<IAccount>;

  roles$: Observable<Array<IRole>>;

  private _captcha$ = new BehaviorSubject<ICaptcha>(null);
  public readonly captcha$ = this._captcha$.asObservable();

  isEditMode = false;

  private _accountId: string;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _store: Store<IAppState>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
  ) {
    super();
  }

  ngOnInit(): void {
    this._accountId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._accountId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(AccountSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AccountSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(AccountSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(RolesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isAccountGetProcess, isAccountCreateProcess, isAccountUpdateProcess, isRolesGetProcess]) =>
        isAccountGetProcess || isAccountCreateProcess || isAccountUpdateProcess || isRolesGetProcess
      ),
    );

    this.account$ = this._store.pipe(
      select(AccountSelectors.selectEntity),
    );

    this.roles$ = this._store.pipe(
      select(RolesSelectors.selectCollection),
    );

    this.account$.pipe(
      takeUntil(this.unsubscribe$),
      filter(account => !!account),
    ).subscribe(account => {
      this._accountId = account.id;
      this.isEditMode = !!this._accountId;
      this._cdr.markForCheck();
    });

    if (!!this._accountId) {
      this._store.dispatch(AccountActions.getRequest({ id: this._accountId }));
    }

    this._store.dispatch(RolesActions.getAllRequest({
      options: {
        filter: [
          {
            id: "name",
            value: `${DefaultRoleTypes.ADMIN},${DefaultRoleTypes.OWNER}`,
            operation: "notequals",
          },
        ],
      }
    }));

    this.onResetCaptcha();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(AccountActions.clear());
    this._store.dispatch(RolesActions.clear());
  }

  onSubmit(params: IAccountCreateRequest | IAccount): void {
    if (this.isEditMode) {
      const account = params as IAccount;
      this._store.dispatch(AccountActions.updateRequest({ id: account.id, account }));
    } else {
      const data = params as IAccountCreateRequest;
      this._store.dispatch(AccountActions.createRequest({ data }));
    }
  }

  onCancel(): void {
    this._router.navigate(["/admin/accounts"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/accounts"]);
  }

  public onResetCaptcha() {
    this._apiService.getAuthCaptcha().pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(v => {
      this._captcha$.next(v);
    });
  }
}
