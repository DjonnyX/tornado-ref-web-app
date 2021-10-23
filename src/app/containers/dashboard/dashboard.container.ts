import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import {
  ProductsSelectors, LanguagesSelectors, UserSelectors,
  CurrenciesSelectors, AccountsSelectors,
  RolesSelectors, SelectorsSelectors, OrderTypesSelectors, BusinessPeriodsSelectors, AdsSelectors, LicensesAccountSelectors, TerminalsSelectors, StoresSelectors, RefServerInfoSelectors, AppThemesSelectors
} from '@store/selectors';
import { ProductsActions } from '@store/actions/products.action';
import { IUserProfile } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { BaseComponent } from '@components/base/base-component';
import { map, takeUntil, take, tap, filter } from 'rxjs/operators';
import {
  IProduct, ITag, ILanguage, UserRights, ICurrency,
  IAccountInfo, DefaultRoleTypes, IRole, IAccount, ISelector, SelectorTypes,
  IOrderType, IBusinessPeriod, AdTypes, IAd, ILicenseAccount, ITerminal, IStore, IBackupInfo, IAppTheme, TerminalTypes
} from '@djonnyx/tornado-types';
import { LanguagesActions } from '@store/actions/languages.action';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { UserActions } from '@store/actions/user.action';
import { AccountsActions } from '@store/actions/accounts.action';
import { RolesActions } from '@store/actions/roles.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { AdsActions } from '@store/actions/ads.action';
import { LicensesAccountActions } from '@store/actions/licenses-account.action';
import { TerminalsActions } from '@store/actions/terminals.action';
import { StoresActions } from '@store/actions/stores.action';
import { RefServerInfoActions } from '@store/actions/ref-server-info.action';
import { AppThemesActions } from '@store/actions/app-themes.action';

@Component({
  selector: 'ta-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainer extends BaseComponent implements OnInit, OnDestroy {

  // profile

  public isProcessProfile$: Observable<boolean>;

  private _profile$ = new BehaviorSubject<IUserProfile>(null);
  profile$ = this._profile$.asObservable();

  // employees

  public isProcessEmployees$: Observable<boolean>;

  public accounts$: Observable<Array<IAccount>>;

  public roles$: Observable<Array<IRole>>;

  // menu

  public isProcessMenu$: Observable<boolean>;

  public products$: Observable<Array<IProduct>>;

  public categories$: Observable<Array<ISelector>>;

  public schemesOfModifiers$: Observable<Array<ISelector>>;

  public tags$: Observable<Array<ITag>>;

  // additional

  public isProcessAdditional$: Observable<boolean>;

  public currencies$: Observable<Array<ICurrency>>;

  public languages$: Observable<Array<ILanguage>>;

  public orderTypes$: Observable<Array<IOrderType>>;

  public businessPeriods$: Observable<Array<IBusinessPeriod>>;

  // ads

  public isProcessAds$: Observable<boolean>;

  public splashScreens$: Observable<Array<IAd>>;

  public splashScreensUnavailable$: Observable<Array<IAd>>;

  public banners$: Observable<Array<IAd>>;

  // settings

  public isProcessSettings$: Observable<boolean>;

  public licenses$: Observable<Array<ILicenseAccount>>;

  public terminals$: Observable<Array<ITerminal>>;

  public stores$: Observable<Array<IStore>>;

  public backupInfo$: Observable<IBackupInfo>;

  // themes

  public isProcessThemes$: Observable<boolean>;

  public kioskThemes$: Observable<Array<IAppTheme>>;

  public eqThemes$: Observable<Array<IAppTheme>>;

  public orderPickerThemes$: Observable<Array<IAppTheme>>;


  public defaultLanguage$: Observable<ILanguage>;

  public rights$: Observable<Array<UserRights>>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.rights$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(p => p?.account?.role?.rights || []),
    );

    // profile
    this.isProcessProfile$ = combineLatest([
      this._store.pipe(
        select(UserSelectors.selectIsUpdateUserProfileProcess),
      ),
    ]).pipe(
      takeUntil(this.unsubscribe$),
      map(([isUserProfileProcess]) =>
        isUserProfileProcess),
    );

    this._store.pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      select(UserSelectors.selectUserProfile),
      tap(profile => {
        this._profile$.next(profile);
        this._store.dispatch(UserActions.userUpdateProfileRequest({
          params: {
            id: profile.account.id, data: {} as IAccountInfo,
          },
          callback: (err, account: IAccountInfo) => {
            this._profile$.next({
              ...profile,
              account,
            });
          }
        }));
      })
    ).subscribe();

    // employees
    this.isProcessEmployees$ = combineLatest([
      this._store.pipe(
        select(AccountsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(RolesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isAccountsProcess, isRolesProcess]) =>
        isAccountsProcess || isRolesProcess
      ),
    );

    this.accounts$ = this._store.pipe(
      select(AccountsSelectors.selectCollection),
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

    this.roles$ = this._store.pipe(
      select(RolesSelectors.selectCollection),
    );

    this._store.dispatch(RolesActions.getAllRequest({
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

    // menu
    this.isProcessMenu$ = combineLatest([
      this._store.pipe(
        select(ProductsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(TagsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isProductsProgress, isSelectorssProgress, isTagsProgress]) =>
        isProductsProgress || isSelectorssProgress || isTagsProgress),
    );

    this.products$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this._store.dispatch(ProductsActions.getAllRequest({}));

    const selectors$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
    );

    this.categories$ = selectors$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === SelectorTypes.MENU_CATEGORY)),
    );

    this.schemesOfModifiers$ = selectors$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === SelectorTypes.SCHEMA_CATEGORY)),
    );

    this._store.dispatch(SelectorsActions.getAllRequest({}));

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this._store.dispatch(TagsActions.getAllRequest({}));

    // additional

    this.isProcessAdditional$ = combineLatest([
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(CurrenciesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLanguagesProcess, isGetCyrrenciesProcess]) =>
        isLanguagesProcess || isGetCyrrenciesProcess),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this._store.dispatch(LanguagesActions.getAllRequest({}));

    this.currencies$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this._store.dispatch(CurrenciesActions.getAllRequest({}));

    this.orderTypes$ = this._store.pipe(
      select(OrderTypesSelectors.selectCollection),
    );

    this._store.dispatch(OrderTypesActions.getAllRequest({}));

    this.businessPeriods$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectCollection),
    );

    this._store.dispatch(BusinessPeriodsActions.getAllRequest({}));

    // ads

    this.isProcessAds$ = combineLatest([
      this._store.pipe(
        select(AdsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isAdsProcess]) =>
        isAdsProcess),
    );

    const ads$ = this._store.pipe(
      select(AdsSelectors.selectCollection),
    );

    this.splashScreens$ = ads$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === AdTypes.INTRO)),
    );

    this.splashScreensUnavailable$ = ads$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === AdTypes.SERVICE_UNAVAILABLE)),
    );

    this.banners$ = ads$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === AdTypes.BANNER)),
    );

    this._store.dispatch(AdsActions.getAllRequest({}));

    // settings

    this.isProcessSettings$ = combineLatest([
      this._store.pipe(
        select(LicensesAccountSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TerminalsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isLicensesProcess, isTerminalsProcess, isStoresProcess]) =>
        isLicensesProcess || isTerminalsProcess || isStoresProcess),
    );

    this.licenses$ = this._store.pipe(
      select(LicensesAccountSelectors.selectCollection),
    );

    this._store.dispatch(LicensesAccountActions.getAllRequest({}));

    this.terminals$ = this._store.pipe(
      select(TerminalsSelectors.selectCollection),
    );

    this._store.dispatch(TerminalsActions.getAllRequest({}));

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this._store.dispatch(StoresActions.getAllRequest({}));

    this.backupInfo$ = this._store.pipe(
      select(RefServerInfoSelectors.selectEntity),
    ).pipe(
      map(v => v?.backup),
    );

    this._store.dispatch(RefServerInfoActions.getRequest());

    // themes

    this.isProcessThemes$ = combineLatest([
      this._store.pipe(
        select(AppThemesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isAppThemesProcess]) =>
        isAppThemesProcess),
    );

    const themes$ = this._store.pipe(
      select(AppThemesSelectors.selectCollection),
    );

    this.kioskThemes$ = themes$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === TerminalTypes.KIOSK)),
    );

    this.eqThemes$ = themes$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === TerminalTypes.EQUEUE)),
    );

    this.orderPickerThemes$ = themes$.pipe(
      filter(v => !!v),
      map(v => v.filter(item => item.type === TerminalTypes.ORDER_PICKER)),
    );

    this._store.dispatch(AppThemesActions.getAllRequest({}));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    // employees
    this._store.dispatch(AccountsActions.clear());
    this._store.dispatch(RolesActions.clear());

    // menu    
    this._store.dispatch(ProductsActions.clear());
    this._store.dispatch(SelectorsActions.clear());
    this._store.dispatch(TagsActions.clear());

    // additional
    this._store.dispatch(CurrenciesActions.clear());
    this._store.dispatch(LanguagesActions.clear());
    this._store.dispatch(OrderTypesActions.clear());
    this._store.dispatch(BusinessPeriodsActions.clear());

    // ads
    this._store.dispatch(AdsActions.clear());

    // settings
    this._store.dispatch(LicensesAccountActions.clear());
    this._store.dispatch(TerminalsActions.clear());
    this._store.dispatch(StoresActions.clear());
    this._store.dispatch(RefServerInfoActions.clear());

    // themes
    this._store.dispatch(AppThemesActions.clear());
  }
}
