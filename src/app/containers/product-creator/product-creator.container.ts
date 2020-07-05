import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IProduct } from '@app/models/product.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { Observable, combineLatest } from 'rxjs';
import { ProductsSelectors, ProductNodesSelectors, SelectorsSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITag, INode, ISelector } from '@models';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { TagsActions } from '@store/actions/tags.action';
import { ProductNodesActions } from '@store/actions/product-nodes.action';
import { SelectorsActions } from '@store/actions/selectors.action';

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

  rootNodeId$: Observable<string>;

  product$: Observable<IProduct>;

  nodes$: Observable<Array<INode>>;

  selectors$: Observable<Array<ISelector>>;

  products$: Observable<Array<IProduct>>;

  tags$: Observable<Array<ITag>>;

  isEditMode = false;

  private _returnUrl: string;

  private _product: IProduct;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.isEditMode = !!this._activatedRoute.snapshot.queryParams["isEditMode"];

    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(ProductsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TagsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductNodesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isGetSelectorsProcess, isGetTagsProcess, isGetProductNodesProcess]) => isGetSelectorsProcess && isGetTagsProcess && isGetProductNodesProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(ProductsSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(ProductsSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess && isUpdateProcess),
    );

    this.isProcessHierarchy$ = this._store.pipe(
      select(ProductNodesSelectors.selectLoading),
    );

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

    if (this.isEditMode) {
      this.product$ = this._store.pipe(
        select(ProductsSelectors.selectEditProduct),
      );
    } else {
      this.product$ = this._store.pipe(
        select(ProductsSelectors.selectNewProduct),
      );
    }

    this.rootNodeId$ = this.product$.pipe(
      map(product => product.joint),
    )

    this.rootNodeId$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(rootNodeId => {
      // запрос дерева нодов по привязочному ноду
      this._store.dispatch(ProductNodesActions.getAllRequest({ id: rootNodeId}));
      this._store.dispatch(TagsActions.getAllRequest());
      this._store.dispatch(ProductsActions.getAllRequest());
      this._store.dispatch(SelectorsActions.getAllRequest());
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onCreateHierarchyNode(node: INode): void {
    
  }

  onUpdateHierarchyNode(node: INode): void {
    
  }

  onDeleteHierarchyNode(node: INode): void {
    
  }

  onSubmit(product: IProduct): void {
    if (this.isEditMode) {
      this._store.dispatch(ProductsActions.setEditProduct({ product: undefined }));
      this._store.dispatch(ProductsActions.updateRequest({ id: product.id, product }));
    } else {
      this._store.dispatch(ProductsActions.setNewProduct({ product: undefined }));
      this._store.dispatch(ProductsActions.createRequest(product));
    }

    this._router.navigate([this._returnUrl]);
  }

  onUpdate(product: IProduct): void {
    const p = { ...this._product, ...product };

    if (this.isEditMode) {
      this._store.dispatch(ProductsActions.setEditProduct({ product: p }));
    } else {
      this._store.dispatch(ProductsActions.setNewProduct({ product: p }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }
}
