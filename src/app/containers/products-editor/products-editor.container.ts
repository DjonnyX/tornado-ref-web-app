import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsSelectors, AssetsSelectors } from '@store/selectors';
import { ProductsActions } from '@store/actions/products.action';
import { IAsset } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { ProductActions } from '@store/actions/product.action';
import { AssetsActions } from '@store/actions/assets.action';
import { BaseComponent } from '@components/base/base-component';
import { map } from 'rxjs/operators';
import { IProduct, ITag, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-products-editor',
  templateUrl: './products-editor.container.html',
  styleUrls: ['./products-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IProduct>>;

  public tags$: Observable<Array<ITag>>;

  public assets$: Observable<Array<IAsset>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._store.dispatch(ProductsActions.getAllRequest());

    this._store.dispatch(TagsActions.getAllRequest());

    this._store.dispatch(AssetsActions.getAllRequest());

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    )

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(ProductsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(TagsSelectors.selectLoading),
      ),
    ).pipe(
      map(([isProductsProgress, isAssetsProgress, isTagsProgress]) => isProductsProgress || isAssetsProgress || isTagsProgress),
    );

    this.collection$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(ProductsSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(ProductActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url }
    });
  }

  onEdit(product: IProduct): void {

    this._store.dispatch(ProductActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: product.id, returnUrl: this._router.routerState.snapshot.url }
    });
  }

  onUpdate(product: IProduct): void {
    this._store.dispatch(ProductsActions.updateRequest({id: product.id, product}));
  }

  onDelete(id: string): void {
    this._store.dispatch(ProductsActions.deleteRequest({ id }));
  }
}
