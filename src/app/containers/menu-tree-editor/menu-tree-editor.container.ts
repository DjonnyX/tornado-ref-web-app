import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { IAppState } from '@store/state';
import { MenuNodesSelectors, SelectorsSelectors, ProductsSelectors, BusinessPeriodsSelectors, BusinessPeriodSelectors, AssetsSelectors, CurrenciesSelectors } from '@store/selectors';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ProductsActions } from '@store/actions/products.action';
import { takeUntil, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { INode, ISelector, IProduct, IRef, IBusinessPeriod, IAsset, SelectorTypes, ICurrency } from '@djonnyx/tornado-types';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { AssetsActions } from '@store/actions/assets.action';
import { CurrenciesActions } from '@store/actions/currencies.action';

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

  assets$: Observable<Array<IAsset>>;

  currencies$: Observable<Array<ICurrency>>;

  refInfo$: Observable<IRef>;

  isProcess$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {

    this._store.dispatch(MenuNodesActions.getRootNodeIdRequest());

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
      this._store.dispatch(ProductsActions.getAllRequest());
      this._store.dispatch(BusinessPeriodsActions.getAllRequest());
      this._store.dispatch(AssetsActions.getAllRequest());
      this._store.dispatch(CurrenciesActions.getAllRequest());
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

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection)
    );

    this.currencies$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(MenuNodesSelectors.selectRefInfo),
    );

    this.isProcess$ = combineLatest(
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
    ).pipe(
      map(([menuNodesLoading, selectorsLoading, productsLoading, businessPeriodsLoading, assetsLoading, isCurrenciesProcess]) => 
      (menuNodesLoading || selectorsLoading || productsLoading || businessPeriodsLoading || assetsLoading || isCurrenciesProcess)),
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
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
