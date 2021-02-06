import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { IAppState } from '@store/state';
import {
  MenuNodesSelectors, SelectorsSelectors, ProductsSelectors, BusinessPeriodsSelectors, BusinessPeriodSelectors,
  AssetsSelectors, CurrenciesSelectors, LanguagesSelectors, OrderTypesSelectors, StoresSelectors
} from '@store/selectors';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ProductsActions } from '@store/actions/products.action';
import { takeUntil, map, filter } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import {
  INode, ISelector, IProduct, IRef, IBusinessPeriod, IAsset, SelectorTypes, ICurrency, ILanguage,
  IOrderType, IStore
} from '@djonnyx/tornado-types';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { AssetsActions } from '@store/actions/assets.action';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { StoresActions } from '@store/actions/stores.action';

@Component({
  selector: 'ta-menu-tree-editor',
  templateUrl: './menu-tree-editor.container.html',
  styleUrls: ['./menu-tree-editor.container.scss']
})
export class MenuTreeEditorContainer extends BaseComponent implements OnInit, OnDestroy {

  rootNodeId$: Observable<string>;

  nodes$: Observable<Array<INode>>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  businessPeriods$: Observable<Array<IBusinessPeriod>>;

  stores$: Observable<Array<IStore>>;

  orderTypes$: Observable<Array<IOrderType>>;

  assets$: Observable<Array<IAsset>>;

  currencies$: Observable<Array<ICurrency>>;

  refInfo$: Observable<IRef>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isProcess$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {
    this.rootNodeId$ = this._store.pipe(
      select(MenuNodesSelectors.selectRootNodeId),
    );

    // Пока выборка селекторов только для киоска
    this._store.pipe(
      takeUntil(this.unsubscribe$),
      select(MenuNodesSelectors.selectRootNodeId),
    ).subscribe(id => {
      this._store.dispatch(MenuNodesActions.getAllRequest({ id }));
      this._store.dispatch(SelectorsActions.getAllRequest({}));
      this._store.dispatch(ProductsActions.getAllRequest({}));
      this._store.dispatch(BusinessPeriodsActions.getAllRequest({}));
      this._store.dispatch(AssetsActions.getAllRequest());
      this._store.dispatch(CurrenciesActions.getAllRequest({}));
      this._store.dispatch(LanguagesActions.getAllRequest({}));
      this._store.dispatch(OrderTypesActions.getAllRequest({}));
      this._store.dispatch(StoresActions.getAllRequest({}));
    });

    this.nodes$ = this._store.pipe(
      select(MenuNodesSelectors.selectCollection),
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

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection)
    );

    this.currencies$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(MenuNodesSelectors.selectRefInfo),
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

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(MenuNodesSelectors.selectLoading),
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
        select(AssetsSelectors.selectLoading),
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
      map(([menuNodesLoading, selectorsLoading, productsLoading, businessPeriodsLoading,
        assetsLoading, isCurrenciesProcess, isLanguagesProcess, isOrderTypesProcess,
        isStoresGetProcess]) =>
      (menuNodesLoading || selectorsLoading || productsLoading || businessPeriodsLoading ||
        assetsLoading || isCurrenciesProcess || isLanguagesProcess || isOrderTypesProcess ||
        isStoresGetProcess)),
    );

    this._store.dispatch(MenuNodesActions.getRootNodeIdRequest({}));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(SelectorsActions.clear());
    this._store.dispatch(ProductsActions.clear());
    this._store.dispatch(MenuNodesActions.clear());
    this._store.dispatch(BusinessPeriodsActions.clear());
    this._store.dispatch(AssetsActions.clear());
    this._store.dispatch(CurrenciesActions.clear());
    this._store.dispatch(LanguagesActions.clear());
    this._store.dispatch(OrderTypesActions.clear());
    this._store.dispatch(StoresActions.clear());
  }

  onSearch(pattern: string): void {

  }

  onCreate(node: INode): void {
    this._store.dispatch(MenuNodesActions.createRequest({ node }));
  }

  onUpdate(node: INode): void {
    this._store.dispatch(MenuNodesActions.updateRequest({ id: node.id, node }));
  }

  onDelete(node: INode): void {
    this._store.dispatch(MenuNodesActions.deleteRequest({ id: node.id }));
  }
}
