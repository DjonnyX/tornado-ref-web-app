import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import {
  ProductsSelectors, SelectorsSelectors, ProductAssetsSelectors, BusinessPeriodsSelectors,
  AssetsSelectors, LanguagesSelectors, OrderTypesSelectors, StoresSelectors, MenuNodesSelectors, SystemTagsSelectors
} from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagsActions } from '@store/actions/tags.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ProductAssetsActions } from '@store/actions/product-assets.action';
import { ProductSelectors } from '@store/selectors/product.selectors';
import { ProductActions } from '@store/actions/product.action';
import {
  IProduct, INode, ISelector, ITag, IBusinessPeriod, ICurrency, ProductResourceTypes, ILanguage,
  IStore, IOrderType, ISystemTag
} from '@djonnyx/tornado-types';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { AssetsActions } from '@store/actions/assets.action';
import { CurrenciesSelectors } from '@store/selectors/currencies.selectors';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';
import { StoresActions } from '@store/actions/stores.action';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { MenuNodesActions } from '@store/actions/menu-nodes.action';
import { SystemTagsActions } from '@store/actions/system-tags.action';

@Component({
  selector: 'ta-product-creator',
  templateUrl: './product-creator.container.html',
  styleUrls: ['./product-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessHierarchy$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  product$: Observable<IProduct>;

  businessPeriods$: Observable<Array<IBusinessPeriod>>;

  stores$: Observable<Array<IStore>>;

  nodes$: Observable<Array<INode>>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  orderTypes$: Observable<Array<IOrderType>>;

  productAssets$: Observable<Array<IAsset>>;

  galleryProductAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  assets$: Observable<Array<IAsset>>;

  tags$: Observable<Array<ITag>>;

  systemTags$: Observable<Array<ISystemTag>>;

  currencies$: Observable<Array<ICurrency>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _productId: string;

  private _productId$ = new BehaviorSubject<string>(undefined);
  readonly productId$ = this._productId$.asObservable();

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._productId = this._activatedRoute.snapshot.queryParams["id"];
    this._productId$.next(this._productId);

    this.isEditMode = !!this._productId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(ProductSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(MenuNodesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(BusinessPeriodsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
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
      this._store.pipe(
        select(SystemTagsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isGetProductProcess, isGetTagsProcess, isGetNodesProcess, isSelectorsProcess,
        isProductsProcess, isBusinessPeriodsProcess, isAssetsProcess, isCurrenciesProcess,
        isLanguagesProcess, isOrderTypesProcess, isStoresGetProcess, isSystemTagsProcess]) =>
        isGetProductProcess || isGetTagsProcess || isGetNodesProcess || isSelectorsProcess
        || isProductsProcess || isBusinessPeriodsProcess || isAssetsProcess || isCurrenciesProcess
        || isLanguagesProcess || isOrderTypesProcess || isStoresGetProcess || isSystemTagsProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(ProductSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(ProductSelectors.selectIsUpdateProcess),
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
        select(ProductAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(ProductAssetsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) =>
        isGetProcess || isUpdateProcess || isDeleteProcess),
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

    this.selectors$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
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

    this.productAssets$ = combineLatest([
      this._store.select(ProductAssetsSelectors.selectCollection),
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

    this.product$ = combineLatest([
      this._store.select(ProductSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([product, langs, defaultLang]) => !!product && !!defaultLang && !!langs),
      map(([product, langs, defaultLang]) => {
        return { ...product, contents: getCompiledContents(product.contents, langs, defaultLang) };
      })
    );

    this.product$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(product => {
      this._productId = product.id;
      this._productId$.next(this._productId);
      this.isEditMode = true;
    });

    this.galleryProductAssets$ = combineLatest([
      this.product$,
      this._store.select(ProductAssetsSelectors.selectCollection),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([product, assets, langs, defaultLang]) => !!product && !!assets && !!langs && !!defaultLang),
      map(([product, assets, langs, defaultLang]) => {
        const result: { [lang: string]: Array<IAsset> } = {};
        for (const lang in assets) {
          result[lang] = assets[lang].filter(asset =>
            !product.contents[lang] ||
            (
              !product.contents[lang].resources || (asset.id !==
                product.contents[lang].resources.main && asset.id !==
                product.contents[lang].resources.icon)
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

    this.rootNodeId$ = this.product$.pipe(
      filter(product => !!product),
      map(product => product.joint),
    );

    this.rootNodeId$.pipe(
      takeUntil(this.unsubscribe$),
      filter(rootNodeId => !!rootNodeId),
    ).subscribe(rootNodeId => {
      // запрос дерева нодов по привязочному ноду
      this._store.dispatch(MenuNodesActions.getAllRequest({}));
      this._store.dispatch(ProductAssetsActions.getAllRequest({ productId: this._productId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._productId,
        }
      });
    });

    if (!!this._productId) {
      this._store.dispatch(ProductActions.getRequest({ id: this._productId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest({}));
    this._store.dispatch(ProductsActions.getAllRequest({}));
    this._store.dispatch(SelectorsActions.getAllRequest({}));
    this._store.dispatch(BusinessPeriodsActions.getAllRequest({}));
    this._store.dispatch(AssetsActions.getAllRequest());
    this._store.dispatch(TagsActions.getAllRequest({}));
    this._store.dispatch(CurrenciesActions.getAllRequest({}));
    this._store.dispatch(StoresActions.getAllRequest({}));
    this._store.dispatch(OrderTypesActions.getAllRequest({}));
    this._store.dispatch(SystemTagsActions.getAllRequest({}));

    const prepareMainRequests$ = combineLatest([
      this.tags$,
      this.currencies$,
      this.selectors$,
      this.products$,
      this.businessPeriods$,
      this.languages$,
      this.defaultLanguage$,
      this.assets$,
      this.stores$,
      this.systemTags$,
    ]).pipe(
      map(([tags, currencies, selectors, products, businessPeriods, languages, defaultLanguage, assets, stores, systemTags]) =>
        !!tags && !!currencies && !!selectors && !!products && !!businessPeriods && !!languages &&
        !!defaultLanguage && !!assets && !!stores && !!systemTags),
    );

    this.isPrepareToConfigure$ = this.productId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          prepareMainRequests$,
          this.nodes$,
          this.product$,
          this.productAssets$,
        ]).pipe(
          map(([prepareMainRequests, nodes, product, productAssets]) =>
            !!prepareMainRequests && !!nodes && !!product && !!productAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(ProductActions.clear());
    this._store.dispatch(ProductsActions.clear());
    this._store.dispatch(ProductAssetsActions.clear());
    this._store.dispatch(MenuNodesActions.clear());
    this._store.dispatch(SelectorsActions.clear());
    this._store.dispatch(BusinessPeriodsActions.clear());
    this._store.dispatch(AssetsActions.clear());
    this._store.dispatch(TagsActions.clear());
    this._store.dispatch(CurrenciesActions.clear());
    this._store.dispatch(StoresActions.clear());
    this._store.dispatch(SystemTagsActions.clear());
  }

  onCreateSystemTag(systemTag: ISystemTag): void {
    this._store.dispatch(SystemTagsActions.createRequest({ systemTag }));
  }

  onDeleteSystemTag(id: string): void {
    this._store.dispatch(SystemTagsActions.deleteRequest({ id }));
  }

  onAssetUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.createRequest({ productId: this._productId, data }));
  }

  onAssetUpdate(data: IAssetUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.updateRequest({ productId: this._productId, langCode: data.langCode, asset: data.asset }));
  }

  onAssetDelete(data: IAssetUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.deleteRequest({ productId: this._productId, langCode: data.langCode, assetId: data.asset.id }));
  }

  onMainResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadResourceRequest({ productId: this._productId, resourcesType: ProductResourceTypes.MAIN, data }));
  }

  onIconResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadResourceRequest({ productId: this._productId, resourcesType: ProductResourceTypes.ICON, data }));
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

  onMainOptionsSave(product: IProduct): void {
    if (this.isEditMode) {
      const normalizedProduct: IProduct = { ...product };

      // нормализация контена
      normalizeEntityContents(normalizedProduct.contents, this._defaultLanguage.code);

      this._store.dispatch(ProductActions.updateRequest({ id: product.id, product: normalizedProduct }));
    } else {
      this._store.dispatch(ProductActions.createRequest({ product }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate(["/admin/products"]);
  }

  onToBack(): void {
    this._router.navigate(["/admin/products"]);
  }
}
