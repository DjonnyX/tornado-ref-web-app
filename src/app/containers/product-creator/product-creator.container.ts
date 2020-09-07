import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { ProductsSelectors, ProductNodesSelectors, SelectorsSelectors, ProductAssetsSelectors, BusinessPeriodsSelectors, AssetsSelectors, LanguagesSelectors, OrderTypesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagsActions } from '@store/actions/tags.action';
import { ProductNodesActions } from '@store/actions/product-nodes.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ProductAssetsActions } from '@store/actions/product-assets.action';
import { ProductSelectors } from '@store/selectors/product.selectors';
import { ProductActions } from '@store/actions/product.action';
import { IProduct, INode, ISelector, ITag, IBusinessPeriod, ICurrency, ProductResourceTypes, ILanguage, IProductContents, IOrderType } from '@djonnyx/tornado-types';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { AssetsActions } from '@store/actions/assets.action';
import { CurrenciesSelectors } from '@store/selectors/currencies.selectors';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { deepMergeObjects } from '@app/utils/object.util';
import { IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { normalizeEntityContents } from '@app/utils/entity.util';

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

  nodes$: Observable<Array<INode>>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  orderTypes$: Observable<Array<IOrderType>>;

  productAssets$: Observable<Array<IAsset>>;

  galleryProductAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  assets$: Observable<Array<IAsset>>;

  tags$: Observable<Array<ITag>>;

  currencies$: Observable<Array<ICurrency>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _returnUrl: string;

  private _productId: string;

  private _productId$ = new BehaviorSubject<string>(undefined);
  readonly productId$ = this._productId$.asObservable();

  private _product: IProduct;

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._productId = this._activatedRoute.snapshot.queryParams["id"];
    this._productId$.next(this._productId);

    this.isEditMode = !!this._productId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(ProductSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductNodesSelectors.selectIsGetProcess),
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
    ).pipe(
      map(([isGetProductProcess, isGetTagsProcess, isGetProductNodesProcess, isSelectorsProcess, isProductsProcess, isBusinessPeriodsProcess, isAssetsProcess, isCurrenciesProcess, isLanguagesProcess, isOrderTypesProcess]) =>
        isGetProductProcess || isGetTagsProcess || isGetProductNodesProcess || isSelectorsProcess || isProductsProcess || isBusinessPeriodsProcess || isAssetsProcess || isCurrenciesProcess || isLanguagesProcess || isOrderTypesProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(ProductSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(ProductSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.isProcessHierarchy$ = this._store.pipe(
      select(ProductNodesSelectors.selectLoading),
    );

    this.isProcessAssets$ = combineLatest(
      this._store.pipe(
        select(ProductAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(ProductAssetsSelectors.selectIsDeleteProcess),
      ),
    ).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) => isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    );

    this.currencies$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this.nodes$ = this._store.pipe(
      select(ProductNodesSelectors.selectCollection),
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

    this.productAssets$ = combineLatest(
      this._store.select(ProductAssetsSelectors.selectCollection),
      this.languages$,
    ).pipe(
      filter(([assets, langs]) => !!assets && !!langs),
      switchMap(([assets, langs]) => {
        const result = new Array<IAsset>();

        for (const lang in assets) {
          result.push(...assets[lang]);
        }

        return of(result);
      }),
    );

    this.product$ = combineLatest(
      this._store.select(ProductSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ).pipe(
      filter(([product, langs, defaultLang]) => !!product && !!defaultLang && !!langs),
      map(([product, langs, defaultLang]) => {
        const contents: IProductContents = {};

        // мерджинг контента от дефолтового языка
        for (const lang in product.contents) {
          // переопределение контента для разных языков
          contents[lang] = lang === defaultLang.code ? product.contents[lang] : deepMergeObjects(product.contents[defaultLang.code], product.contents[lang]);
        }

        // добовление контента языков которых нет в базе
        for (const lang of langs) {
          if (contents[lang.code]) {
            continue;
          }

          contents[lang.code] = product.contents[defaultLang.code];
        }

        return { ...product, contents: normalizeEntityContents(contents, defaultLang.code) };
      })
    );

    this.product$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(product => {
      this._product = product;
      this._productId = product.id;
      this._productId$.next(this._productId);
      this.isEditMode = true;
    });

    this.galleryProductAssets$ = combineLatest(
      this.product$,
      this._store.select(ProductAssetsSelectors.selectCollection),
      this.languages$,
      this.defaultLanguage$,
    ).pipe(
      filter(([product, assets, langs, defaultLang]) => !!product && !!assets && !!langs && !!defaultLang),
      map(([product, assets, langs, defaultLang]) => {
        const result: { [lang: string]: Array<IAsset> } = {};
        for (const lang in assets) {
          result[lang] = assets[lang].filter(asset =>
            !product.contents[lang] ||
            (
              !product.contents[lang].resources || (asset.id !== 
              product.contents[lang].resources.main && asset.id !==
              product.contents[lang].resources.thumbnail && asset.id !==
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
      this._store.dispatch(ProductNodesActions.getAllRequest({ id: rootNodeId }));
      this._store.dispatch(ProductAssetsActions.getAllRequest({ productId: this._productId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._productId,
          returnUrl: this._returnUrl,
        }
      });
    });

    if (!!this._productId) {
      this._store.dispatch(ProductActions.getRequest({ id: this._productId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest());
    this._store.dispatch(ProductsActions.getAllRequest());
    this._store.dispatch(SelectorsActions.getAllRequest({}));
    this._store.dispatch(BusinessPeriodsActions.getAllRequest());
    this._store.dispatch(AssetsActions.getAllRequest());
    this._store.dispatch(TagsActions.getAllRequest());
    this._store.dispatch(CurrenciesActions.getAllRequest());

    const prepareMainRequests$ = combineLatest(
      this.tags$,
      this.currencies$,
      this.selectors$,
      this.products$,
      this.businessPeriods$,
      this.languages$,
      this.defaultLanguage$,
      this.assets$,
    ).pipe(
      map(([tags, currencies, selectors, products, businessPeriods, languages, defaultLanguage, assets]) =>
        !!tags && !!currencies && !!selectors && !!products && !!businessPeriods && !!languages && !!defaultLanguage && !!assets),
    );

    this.isPrepareToConfigure$ = this.productId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest(
          prepareMainRequests$,
          this.nodes$,
          this.product$,
          this.productAssets$,
        ).pipe(
          map(([prepareMainRequests, nodes, product, productAssets]) =>
            !!prepareMainRequests && !!nodes && !!product && !!productAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(ProductActions.clear());
    this._store.dispatch(ProductAssetsActions.clear());
  }

  onAssetUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.createRequest({ productId: this._productId, data}));
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

  onThumbnailResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadResourceRequest({ productId: this._productId, resourcesType: ProductResourceTypes.THUMBNAIL, data }));
  }

  onIconResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadResourceRequest({ productId: this._productId, resourcesType: ProductResourceTypes.ICON, data }));
  }

  onCreateHierarchyNode(node: INode): void {
    this._store.dispatch(ProductNodesActions.createRequest({ node }));
  }

  onUpdateHierarchyNode(node: INode): void {
    this._store.dispatch(ProductNodesActions.updateRequest({ id: node.id, node }));
  }

  onDeleteHierarchyNode(node: INode): void {
    this._store.dispatch(ProductNodesActions.deleteRequest({ id: node.id }));
  }

  onMainOptionsSave(product: IProduct): void {
    if (this.isEditMode) {
      const normalizedProduct: IProduct = {...product};

      // нормализация контена
      normalizeEntityContents(normalizedProduct.contents, this._defaultLanguage.code);

      this._store.dispatch(ProductActions.updateRequest({ id: product.id, product: normalizedProduct }));
    } else {
      this._store.dispatch(ProductActions.createRequest({ product }));
    }

    // this._router.navigate([this._returnUrl]);
  }

  onMainOptionsCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
