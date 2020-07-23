import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { AssetsSelectors } from '@store/selectors';
import { IAsset } from '@app/models/asset.model';
import { ProductsActions } from '@store/actions/products.action';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetsActions } from '@store/actions/assets.action';
import { IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-assets-editor',
  templateUrl: './assets-editor.container.html',
  styleUrls: ['./assets-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IAsset>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(AssetsActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(AssetsSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(AssetsSelectors.selectRefInfo),
    );
  }

  onCreateProduct(): void {
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url }
    });
  }

  onEditProduct(product: IAsset): void {
    /*this._store.dispatch(ProductsActions.setEditProduct({ product }));

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url, isEditMode: true }
    });*/
  }

  onDeleteProduct(id: string): void {
    this._store.dispatch(ProductsActions.deleteRequest({ id }));
  }
}
