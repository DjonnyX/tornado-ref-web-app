import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { ProductsSelectors } from '@store/selectors';
import { IProduct } from '@app/models/product.model';
import { ProductsActions } from '@store/actions/products.action';
import { IRef } from '@models';

@Component({
  selector: 'ta-products-editor',
  templateUrl: './products-editor.container.html',
  styleUrls: ['./products-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEditorContainer implements OnInit {

  public collection$: Observable<Array<IProduct>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this._store.dispatch(ProductsActions.getAllRequest());

    this.collection$ = this._store.pipe(
      select(ProductsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(ProductsSelectors.selectRefInfo),
    );
  }

  createProduct(product: IProduct): void {
    this._store.dispatch(ProductsActions.createRequest(product));
  }

  deleteProduct(id: string): void {
    this._store.dispatch(ProductsActions.deleteRequest({id}));
  }
}
