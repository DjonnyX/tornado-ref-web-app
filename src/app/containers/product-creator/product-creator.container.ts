import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { ProductsSelectors, ProductNodesSelectors, SelectorsSelectors, ProductAssetsSelectors, BusinessPeriodsSelectors, AssetsSelectors, LanguageSelectors, LanguagesSelectors } from '@store/selectors';
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
import { IProduct, INode, ISelector, ITag, IBusinessPeriod, ICurrency, IProductImages, ProductImageTypes, ILanguage, IProductContents } from '@djonnyx/tornado-types';
import { BusinessPeriodsActions } from '@store/actions/business-periods.action';
import { AssetsActions } from '@store/actions/assets.action';
import { CurrenciesSelectors } from '@store/selectors/currencies.selectors';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { deepMergeObjects } from '@app/utils/object.util';

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

  productAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  actualProductAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  assets$: Observable<Array<IAsset>>;

  tags$: Observable<Array<ITag>>;

  currencies$: Observable<Array<ICurrency>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _returnUrl: string;

  private _productId: string;

  private _product: IProduct;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._productId = this._activatedRoute.snapshot.queryParams["id"];

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
    ).pipe(
      map(([isGetProductProcess, isGetTagsProcess, isGetProductNodesProcess, isSelectorsProcess, isProductsProcess, isBusinessPeriodsProcess, isAssetsProcess, isCurrenciesProcess, isLanguagesProcess]) =>
        isGetProductProcess || isGetTagsProcess || isGetProductNodesProcess || isSelectorsProcess || isProductsProcess || isBusinessPeriodsProcess || isAssetsProcess || isCurrenciesProcess || isLanguagesProcess),
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

    this.productAssets$ = this._store.pipe(
      select(ProductAssetsSelectors.selectCollection),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.product$ = combineLatest(
      this._store.select(ProductSelectors.selectEntity),
      this.defaultLanguage$,
    ).pipe(
      filter(([product, defaultLang]) => !!product && !!defaultLang),
      map(([product, defaultLang]) => {
        const contents: IProductContents = {};
        for (const lang in product.contents) {
          // переопределение контента для разных языков
          contents[lang] = lang === defaultLang.code ? product.contents[lang] : deepMergeObjects(product.contents[defaultLang.code], product.contents[lang]);
        }
        return {...product, contents};
      })
    );

    this.product$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(product => {
      this._product = product;
      this._productId = product.id;
      this.isEditMode = true;
    });

    this.actualProductAssets$ = combineLatest(
      this.product$,
      this.productAssets$,
      this.defaultLanguage$,
    ).pipe(
      filter(([product, assets, defaultLanguage]) => !!product && !!assets && !!defaultLanguage),
      map(([product, assets, defaultLanguage]) => {
        const result: { [lang: string]: Array<IAsset> } = {};
        for (const lang in assets) {
          result[lang] = assets[lang].filter(asset => !product.contents[defaultLanguage.code] || (asset.id !== product.contents[defaultLanguage.code].images.main && asset.id !== product.contents[defaultLanguage.code].images.thumbnail && asset.id !== product.contents[defaultLanguage.code].images.icon))
        }
        return result;
      }),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
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

    this.isPrepareToConfigure$ = of(this._productId).pipe(
      switchMap(id => {
        return !!id ? combineLatest(
          this.tags$,
          this.currencies$,
          this.nodes$,
          this.product$,
          this.selectors$,
          this.products$,
          this.businessPeriods$,
          this.productAssets$,
          this.languages$,
          this.defaultLanguage$,
          this.assets$,
        ).pipe(
          map(([tags, currencies, nodes, product, selectors, products, businessPeriods, productAssets, languages, defaultLanguage, assets]) =>
            !!tags && !!currencies && !!nodes && !!product && !!selectors && !!products && !!businessPeriods && !!productAssets && !!languages && !!defaultLanguage && !!assets),
        ) :
          combineLatest(
            this.tags$,
            this.languages$,
            this.defaultLanguage$,
          ).pipe(
            map(([tags, languages, defaultLanguage]) =>
              !!tags && !!languages && !!defaultLanguage),
          );
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(ProductActions.clear());
    this._store.dispatch(ProductAssetsActions.clear());
  }

  onAssetUpload(file: File): void {
    // this._store.dispatch(ProductAssetsActions.createRequest({ productId: this._productId, file }));
  }

  onAssetUpdate(asset: IAsset): void {
    // this._store.dispatch(ProductAssetsActions.updateRequest({ productId: this._productId, asset }));
  }

  onAssetDelete(asset: IAsset): void {
    // this._store.dispatch(ProductAssetsActions.deleteRequest({ productId: this._productId, assetId: asset.id }));
  }

  onMainImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadImageRequest({ productId: this._productId, imageType: ProductImageTypes.MAIN, data }));
  }

  onThumbnailImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadImageRequest({ productId: this._productId, imageType: ProductImageTypes.THUMBNAIL, data }));
  }

  onIconImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(ProductAssetsActions.uploadImageRequest({ productId: this._productId, imageType: ProductImageTypes.ICON, data }));
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
      this._store.dispatch(ProductActions.updateRequest({ id: product.id, product }));
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
