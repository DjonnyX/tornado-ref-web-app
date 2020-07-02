import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsSelectors } from '@store/selectors';
import { IProduct } from '@app/models/product.model';
import { ProductsActions } from '@store/actions/products.action';
import { IRef } from '@models';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'ta-products-editor',
  templateUrl: './products-editor.container.html',
  styleUrls: ['./products-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IProduct>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(ProductsActions.getAllRequest());

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

  createProduct(product: IProduct): void {
    this._store.dispatch(ProductsActions.setNewProduct({ product }));

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url }
    });
  }

  editProduct(product: IProduct): void {
    this._store.dispatch(ProductsActions.setEditProduct({ product }));

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url, isEditMode: true }
    });
  }

  deleteProduct(id: string): void {
    this._store.dispatch(ProductsActions.deleteRequest({ id }));
  }
}
