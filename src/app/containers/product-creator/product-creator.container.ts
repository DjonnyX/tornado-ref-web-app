import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IProduct } from '@app/models/product.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { Observable, combineLatest } from 'rxjs';
import { ProductsSelectors, ProductNodesSelectors, SelectorsSelectors, AssetsSelectors, ProductAssetsSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, debounceTime } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, INode, ISelector, IAsset } from '@models';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagsActions } from '@store/actions/tags.action';
import { ProductNodesActions } from '@store/actions/product-nodes.action';
import { SelectorsActions } from '@store/actions/selectors.action';
import { ApiService } from '@services';
import { ProductAssetsActions } from '@store/actions/product-assets.action';
import { ProductSelectors } from '@store/selectors/product.selectors';
import { ProductActions } from '@store/actions/product.action';

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

  nodes$: Observable<Array<INode>>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  assets$: Observable<Array<IAsset>>;

  tags$: Observable<Array<ITag>>;

  isEditMode = false;

  private _returnUrl: string;

  private _productId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute, private _apiService: ApiService) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._productId = this._activatedRoute.snapshot.queryParams["productId"];

    this.isEditMode = !!this._productId;

    this._store.dispatch(ProductActions.clear());

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
    ).pipe(
      map(([isGetProductProcess, isGetTagsProcess, isGetProductNodesProcess, isSelectorsProcess, isProductsProcess]) =>
        isGetProductProcess || isGetTagsProcess || isGetProductNodesProcess || isSelectorsProcess || isProductsProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(ProductsSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectIsUpdateProcess),
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

    this.product$ = this._store.pipe(
      select(ProductSelectors.selectEntity),
    );

    this.product$.pipe(
      takeUntil(this.unsubscribe$),
      filter(product => !!product),
      filter(product => this._productId !== product.id),
    ).subscribe(product => {
      this._productId = product.id;
      this.isEditMode = !!this._productId;
    })

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
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

    this.assets$ = this._store.pipe(
      select(ProductAssetsSelectors.selectCollection),
    );

    this.rootNodeId$ = this.product$.pipe(
      filter(product => !!product),
      map(product => product.joint),
    );

    this.rootNodeId$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(rootNodeId => {
      // запрос дерева нодов по привязочному ноду
      this._store.dispatch(ProductNodesActions.getAllRequest({ id: rootNodeId }));
      this._store.dispatch(ProductsActions.getAllRequest());
      this._store.dispatch(SelectorsActions.getAllRequest());
      this._store.dispatch(ProductAssetsActions.getAllRequest({ productId: this._productId }));
    });

    this._store.dispatch(TagsActions.getAllRequest());

    if (!!this._productId) {
      this._store.dispatch(ProductActions.getRequest({ id: this._productId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onAssetUpload(file: File): void {
    this._store.dispatch(ProductAssetsActions.createRequest({ productId: this._productId, file }));
  }

  onAssetRemove(assetId: string): void {
    this._store.dispatch(ProductAssetsActions.deleteRequest({ productId: this._productId, assetId }));
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
      this._store.dispatch(ProductActions.createRequest(product));
    }

    // this._router.navigate([this._returnUrl]);
  }

  onMainOptionsCancel(): void {
    this._router.navigate([this._returnUrl]);
  }
}
