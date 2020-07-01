import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./product-creator.container.scss']
})
export class ProductCreatorContainer implements OnInit {
  
  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isProcess$ = this._store.pipe(
      select(ProductsSelectors.selectIsCreateProcess),
    );

    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";
  }

  onCreate(product: IProduct): void {
    this._store.dispatch(ProductsActions.createRequest(product));
    this._router.navigate([this._returnUrl]);
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }
}
