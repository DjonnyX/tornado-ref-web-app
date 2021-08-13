import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import {
  SelectorsSelectors, SelectorAssetsSelectors, BusinessPeriodsSelectors, AssetsSelectors, LanguagesSelectors, TagsSelectors,
  MenuNodesSelectors, ProductsSelectors, CurrenciesSelectors, OrderTypesSelectors, StoresSelectors, SystemTagsSelectors
} from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap, debounceTime } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { SelectorsActions } from '@store/actions/selectors.action';
import { SelectorAssetsActions } from '@store/actions/selector-assets.action';
import { SelectorSelectors } from '@store/selectors/selector.selectors';
import { SelectorActions } from '@store/actions/selector.action';
import {
  ISelector, SelectorResourceTypes, ILanguage, IBusinessPeriod, IStore, INode, IProduct, IOrderType, ITag,
  ICurrency,
  SelectorTypes,
  ISystemTag
} from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { ProductsActions } from '@store/actions/products.action';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { TagsActions } from '@store/actions/tags.action';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { StoresActions } from '@store/actions/stores.action';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { SystemTagsActions } from '@store/actions/system-tags.action';

@Component({
  selector: 'ta-selector-creator',
  templateUrl: './selector-creator.container.html',
  styleUrls: ['./selector-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  readonly SelectorTypes = SelectorTypes;

  readonly selectors = new Array<ISelector>();

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessHierarchy$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  selector$: Observable<ISelector>;

  selectorAssets$: Observable<Array<IAsset>>;

  gallerySelectorAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  assets$: Observable<Array<IAsset>>;

  businessPeriods$: Observable<Array<IBusinessPeriod>>;

  stores$: Observable<Array<IStore>>;

  nodes$: Observable<Array<INode>>;

  products$: Observable<Array<IProduct>>;

  orderTypes$: Observable<Array<IOrderType>>;

  tags$: Observable<Array<ITag>>;

  systemTags$: Observable<Array<ISystemTag>>;

  currencies$: Observable<Array<ICurrency>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _selectorId: string;

  private _selectorId$ = new BehaviorSubject<string>(undefined);
  readonly selectorId$ = this._selectorId$.asObservable();

  private _selectorType: string;
  get selectorType() { return this._selectorType; }

  private _defaultLanguage: ILanguage;

  private _pagePath: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._selectorId = this._activatedRoute.snapshot.queryParams["id"];
    this._selectorId$.next(this._selectorId);

    this._selectorType = this._activatedRoute.snapshot.data["type"];
    this._pagePath = this._activatedRoute.snapshot.data["path"];

    this.isEditMode = !!this._selectorId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(SelectorSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(MenuNodesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(BusinessPeriodsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(CurrenciesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(OrderTypesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(StoresSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SystemTagsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isGetSelectorProcess, isSelectorsProcess, isAssetsProcess, isLanguagesProcess,
        isTagsProcess, isMenuNodesProcess, isProductsProcess,
        isBusinessPeriodsProcess, isCurrenciesProcess, isOrderTypesProcess,
        isStoresProcess, isSystemTagsProcess]) =>
        isGetSelectorProcess || isSelectorsProcess || isAssetsProcess || isLanguagesProcess ||
        isTagsProcess || isMenuNodesProcess || isProductsProcess ||
        isBusinessPeriodsProcess || isCurrenciesProcess || isOrderTypesProcess ||
        isStoresProcess || isSystemTagsProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(SelectorSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(SelectorSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) =>
        isCreateProcess || isUpdateProcess),
    );

    this.isProcessHierarchy$ = this._store.pipe(
      select(MenuNodesSelectors.selectLoading),
    );

    this.isProcessAssets$ = combineLatest([
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) => isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.systemTags$ = this._store.pipe(
      select(SystemTagsSelectors.selectCollection),
    );

    this.currencies$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this.nodes$ = this._store.pipe(
      select(MenuNodesSelectors.selectCollection),
    );

    this.products$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.businessPeriods$ = this._store.pipe(
      select(BusinessPeriodsSelectors.selectCollection),
    );

    this.stores$ = this._store.pipe(
      select(StoresSelectors.selectCollection),
    );

    this.orderTypes$ = this._store.pipe(
      select(OrderTypesSelectors.selectCollection),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.defaultLanguage$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(lang => {
      this._defaultLanguage = lang;
    });

    this.selectorAssets$ = combineLatest([
      this._store.select(SelectorAssetsSelectors.selectCollection),
      this.languages$,
    ]).pipe(
      filter(([assets, langs]) => !!assets && !!langs),
      switchMap(([assets, langs]) => {
        const result = new Array<IAsset>();

        for (const lang in assets) {
          result.push(...assets[lang]);
        }

        return of(result);
      }),
    );

    this.selector$ = combineLatest([
      this._store.select(SelectorSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([selector, langs, defaultLang]) =>
        !!selector && !!defaultLang && !!langs),
      map(([selector, langs, defaultLang]) => {
        return { ...selector, contents: getCompiledContents(selector.contents, langs, defaultLang) };
      })
    );

    this.selector$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(selector => {
      this._selectorId = selector.id;
      this._selectorId$.next(this._selectorId);
      this.isEditMode = true;

      this._store.dispatch(SelectorAssetsActions.getAllRequest({ selectorId: this._selectorId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._selectorId,
        }
      });
    });

    this.gallerySelectorAssets$ = combineLatest([
      this.selector$,
      this._store.select(SelectorAssetsSelectors.selectCollection),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([selector, assets, langs, defaultLang]) =>
        !!selector && !!assets && !!langs && !!defaultLang),
      map(([selector, assets, langs, defaultLang]) => {
        const result: { [lang: string]: Array<IAsset> } = {};
        for (const lang in assets) {
          result[lang] = assets[lang].filter(asset =>
            !selector.contents[lang] ||
            (
              !selector.contents[lang].resources || (asset.id !==
                selector.contents[lang].resources.main && asset.id !==
                selector.contents[lang].resources.icon)
            ))
        }

        // добовление контента языков которых нет в базе
        for (const lang of langs) {
          if (result[lang.code]) {
            continue;
          }

          result[lang.code] = [];
        }
        return result;
      }),
    );

    this.rootNodeId$ = this.selector$.pipe(
      filter(selector => !!selector.joint),
      map(selector => selector.joint),
    );

    this.rootNodeId$.pipe(
      takeUntil(this.unsubscribe$),
      filter(rootNodeId => !!rootNodeId),
    ).subscribe(rootNodeId => {
      // запрос дерева нодов по привязочному ноду
      this._store.dispatch(MenuNodesActions.getAllRequest({ id: rootNodeId }));
      this._store.dispatch(SelectorAssetsActions.getAllRequest({ selectorId: this._selectorId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._selectorId,
        }
      });
    });

    if (!!this._selectorId) {
      this._store.dispatch(SelectorActions.getRequest({ id: this._selectorId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest({}));
    this._store.dispatch(AssetsActions.getAllRequest());
    this._store.dispatch(SystemTagsActions.getAllRequest(
      {
        options: {
          filter: [{
            id: "extra.entity",
            operation: "equals",
            value: this._selectorType,
          }],
        }
      }
    ));

    if (this._selectorType === SelectorTypes.SCHEMA_CATEGORY) {
      if (!this.isEditMode) {
        this._store.dispatch(MenuNodesActions.getAllRequest({}));
      }

      this._store.dispatch(SelectorsActions.getAllRequest({}));
      this._store.dispatch(ProductsActions.getAllRequest({}));
      this._store.dispatch(BusinessPeriodsActions.getAllRequest({}));
      this._store.dispatch(TagsActions.getAllRequest({}));
      this._store.dispatch(CurrenciesActions.getAllRequest({}));
      this._store.dispatch(StoresActions.getAllRequest({}));
      this._store.dispatch(OrderTypesActions.getAllRequest({}));

      const prepareMainRequests$ = combineLatest([
        this.tags$,
        this.currencies$,
        this.products$,
        this.businessPeriods$,
        this.languages$,
        this.defaultLanguage$,
        this.orderTypes$,
        this.assets$,
        this.stores$,
        this.nodes$,
        this.systemTags$,
      ]).pipe(
        debounceTime(100),
        map(([tags, currencies, products, businessPeriods, languages, defaultLanguage, orderTypes, assets, stores, nodes, systemTags]) => {
          return !!tags && !!currencies && !!products && !!businessPeriods && !!languages &&
            !!defaultLanguage && !!orderTypes && !!assets && !!stores && !!nodes && !!systemTags
        }
        ),
      );

      this.isPrepareToConfigure$ = this.selectorId$.pipe(
        switchMap(id => {
          return !!id ? combineLatest([
            prepareMainRequests$,
            this.selector$,
            this.selectorAssets$,
          ]).pipe(
            map(([prepareMainRequests, selector, selectorAssets]) =>
              !!prepareMainRequests && !!selector && !!selectorAssets),
          ) : prepareMainRequests$;
        })
      );
    } else
      if (this._selectorType === SelectorTypes.MENU_CATEGORY) {
        const prepareMainRequests$ = combineLatest([
          this.languages$,
          this.defaultLanguage$,
          this.assets$,
          this.systemTags$,
        ]).pipe(
          map(([languages, defaultLanguage, assets, systemTags]) =>
            !!languages && !!defaultLanguage && !!assets && !!systemTags),
        );

        this.isPrepareToConfigure$ = this.selectorId$.pipe(
          switchMap(id => {
            return !!id ? combineLatest([
              prepareMainRequests$,
              this.selector$,
              this.selectorAssets$,
            ]).pipe(
              map(([prepareMainRequests, selector, selectorAssets]) =>
                !!prepareMainRequests && !!selector && !!selectorAssets),
            ) : prepareMainRequests$;
          })
        );
      }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(SelectorActions.clear());
    this._store.dispatch(SelectorsActions.clear());
    this._store.dispatch(SelectorAssetsActions.clear());
    this._store.dispatch(AssetsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
    this._store.dispatch(SystemTagsActions.clear());

    if (this._selectorType === SelectorTypes.SCHEMA_CATEGORY) {
      this._store.dispatch(ProductsActions.clear());
      this._store.dispatch(BusinessPeriodsActions.clear());
      this._store.dispatch(TagsActions.clear());
      this._store.dispatch(CurrenciesActions.clear());
      this._store.dispatch(StoresActions.clear());
      this._store.dispatch(OrderTypesActions.clear());
      this._store.dispatch(MenuNodesActions.clear());
    }
  }

  onCreateSystemTag(systemTag: ISystemTag): void {
    this._store.dispatch(SystemTagsActions.createRequest({ systemTag }));
  }

  onDeleteSystemTag(id: string): void {
    this._store.dispatch(SystemTagsActions.deleteRequest({ id }));
  }

  onMainResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.uploadResourceRequest({ selectorId: this._selectorId, resourcesType: SelectorResourceTypes.MAIN, data }));
  }

  onIconResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.uploadResourceRequest({ selectorId: this._selectorId, resourcesType: SelectorResourceTypes.ICON, data }));
  }

  onCreateHierarchyNodes(nodes: Array<INode>): void {
    this._store.dispatch(MenuNodesActions.createMultiRequest({ nodes }));
  }

  onUpdateHierarchyNode(node: INode): void {
    this._store.dispatch(MenuNodesActions.updateRequest({ id: node.id, node }));
  }

  onDeleteHierarchyNode(node: INode): void {
    this._store.dispatch(MenuNodesActions.deleteRequest({ id: node.id }));
  }

  onMainOptionsSave(selector: ISelector): void {
    if (this.isEditMode) {
      const normalizedSelector: ISelector = { ...selector };

      // нормализация контена
      normalizeEntityContents(normalizedSelector.contents, this._defaultLanguage.code);

      this._store.dispatch(SelectorActions.updateRequest({ id: selector.id, selector: normalizedSelector }));
    } else {
      this._store.dispatch(SelectorActions.createRequest({ selector: { ...selector, type: this._selectorType as any } }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate([`/admin/${this._pagePath}`]);
  }

  onToBack(): void {
    this._router.navigate([`/admin/${this._pagePath}`]);
  }
}
