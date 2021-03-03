import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { CheckueActions } from '@store/actions/checkue.action';
import { CheckueSelectors } from '@store/selectors/checkue.selectors';
import {
  IBusinessPeriod, ICheckue, ICurrency, ILanguage, IOrderType, IProduct, IRef, ISelector,
  IStore
} from '@djonnyx/tornado-types';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ProductsActions } from '@store/actions/products.action';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { StoresActions } from '@store/actions/stores.action';
import { OrderTypesActions } from '@store/actions/order-types.action';
import {
  BusinessPeriodSelectors,
  BusinessPeriodsSelectors, CurrenciesSelectors, LanguagesSelectors, OrderTypesSelectors, ProductsSelectors,
  SelectorsSelectors, StoresSelectors
} from '@store/selectors';
import { NodeScenarioTypes } from '@enums/node-scenario-types';

@Component({
  selector: 'ta-checkue-creator',
  templateUrl: './checkue-creator.container.html',
  styleUrls: ['./checkue-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckueCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  readonly type = NodeScenarioTypes.CHECKUE;

  public isProcess$: Observable<boolean>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  businessPeriods$: Observable<Array<IBusinessPeriod>>;

  stores$: Observable<Array<IStore>>;

  orderTypes$: Observable<Array<IOrderType>>;

  currencies$: Observable<Array<ICurrency>>;

  refInfo$: Observable<IRef>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  checkue$: Observable<ICheckue>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _checkueId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._checkueId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._checkueId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(CheckueSelectors.selectLoading),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(BusinessPeriodSelectors.selectLoading),
      ),
      this._store.pipe(
        select(CurrenciesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(OrderTypesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([checkueLoading, selectorsLoading, productsLoading, businessPeriodsLoading,
        isCurrenciesProcess, isLanguagesProcess, isOrderTypesProcess, isStoresGetProcess]) =>
      (checkueLoading || selectorsLoading || productsLoading || businessPeriodsLoading ||
        isCurrenciesProcess || isLanguagesProcess || isOrderTypesProcess || isStoresGetProcess)),
    );

    this.selectors$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
    );

    this.products$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.businessPeriods$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectCollection)
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection)
    );

    this.currencies$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this.orderTypes$ = this._store.pipe(
      select(OrderTypesSelectors.selectCollection),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.checkue$ = this._store.pipe(
      select(CheckueSelectors.selectEntity),
    );

    this.checkue$.pipe(
      takeUntil(this.unsubscribe$),
      filter(checkue => !!checkue),
      filter(checkue => this._checkueId !== checkue.id),
    ).subscribe(checkue => {
      this._checkueId = checkue.id;
      this.isEditMode = !!this._checkueId;
    });

    if (!!this._checkueId) {
      this._store.dispatch(CheckueActions.getRequest({ id: this._checkueId }));
      this._store.dispatch(SelectorsActions.getAllRequest({}));
      this._store.dispatch(ProductsActions.getAllRequest({}));
      this._store.dispatch(BusinessPeriodsActions.getAllRequest({}));
      this._store.dispatch(CurrenciesActions.getAllRequest({}));
      this._store.dispatch(LanguagesActions.getAllRequest({}));
      this._store.dispatch(OrderTypesActions.getAllRequest({}));
      this._store.dispatch(StoresActions.getAllRequest({}));
    }
    const prepareMainRequests$ = combineLatest([
      this.currencies$,
      this.selectors$,
      this.products$,
      this.businessPeriods$,
      this.languages$,
      this.defaultLanguage$,
      this.stores$,
    ]).pipe(
      map(([currencies, selectors, products, businessPeriods, languages, defaultLanguage, stores]) =>
        !!currencies && !!selectors && !!products && !!businessPeriods && !!languages && !!defaultLanguage && !!stores),
    );

    this.isPrepareToConfigure$ = this.checkue$.pipe(
      switchMap(checkue => {
        return !!checkue ? combineLatest([
          prepareMainRequests$,
        ]).pipe(
          map(([prepareMainRequests]) =>
            !!prepareMainRequests),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(CheckueActions.clear());
  }

  onSubmit(checkue: ICheckue): void {
    if (this.isEditMode) {
      this._store.dispatch(CheckueActions.updateRequest({ id: checkue.id, checkue }));
    } else {
      this._store.dispatch(CheckueActions.createRequest({ checkue }));
    }
  }

  onScenarioUpdate(checkue: ICheckue): void {
    this._store.dispatch(CheckueActions.updateRequest({ id: checkue.id, checkue }));
  }

  onCancel(): void {
    this._router.navigate(["/admin/checkues"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/checkues"]);
  }
}
