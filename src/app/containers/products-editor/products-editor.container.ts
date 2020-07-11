import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsSelectors } from '@store/selectors';
import { IProduct } from '@app/models/product.model';
import { ProductsActions } from '@store/actions/products.action';
import { IRef, ITag } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { TagsActions } from '@store/actions/tags.action';
import { TagsSelectors } from '@store/selectors/tags.selectors';
import { ProductActions } from '@store/actions/product.action';

@Component({
  selector: 'ta-products-editor',
  templateUrl: './products-editor.container.html',
  styleUrls: ['./products-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IProduct>>;

  public tags$: Observable<Array<ITag>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(ProductsActions.getAllRequest());

    this._store.dispatch(TagsActions.getAllRequest());

    this.tags$ = this._store.pipe(
      select(TagsSelectors.selectCollection),
    )

    this.isProcess$ = this._store.pipe(
      select(ProductsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(ProductsSelectors.selectRefInfo),
    );
  }

  onCreateProduct(): void {

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url }
    });
  }

  onEditProduct(product: IProduct): void {

    this._store.dispatch(ProductActions.clear());
    
    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { productId: product.id, returnUrl: this._router.routerState.snapshot.url }
    });
  }

  onDeleteProduct(id: string): void {
    this._store.dispatch(ProductsActions.deleteRequest({ id }));
  }
}
