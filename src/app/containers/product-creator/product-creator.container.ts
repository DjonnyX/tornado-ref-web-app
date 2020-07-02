import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from '@app/models/product.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsActions } from '@store/actions/products.action';
import { Observable } from 'rxjs';
import { ProductsSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ta-product-creator',
  templateUrl: './product-creator.container.html',
  styleUrls: ['./product-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  product$: Observable<IProduct>;

  isEditMode = false;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = this._store.pipe(
      select(ProductsSelectors.selectIsCreateProcess),
    );

    this.isEditMode = !!this._activatedRoute.snapshot.queryParams["isEditMode"];

    if (this.isEditMode) {
      this.product$ = this._store.pipe(
        select(ProductsSelectors.selectEditProduct),
      );
    } else {
      this.product$ = this._store.pipe(
        select(ProductsSelectors.selectNewProduct),
      );
    }

    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";
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

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }
}
