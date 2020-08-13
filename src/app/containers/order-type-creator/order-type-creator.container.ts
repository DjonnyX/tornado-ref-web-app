import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { OrderTypeSelectors } from '@store/selectors/order-type.selectors';
import { IOrderType, IOrderTypeImages, IAsset, OrderTypeImageTypes } from '@djonnyx/tornado-types';
import { CurrenciesSelectors, OrderTypeAssetsSelectors } from '@store/selectors';
import { OrderTypeAssetsActions } from '@store/actions/order-type-assets.action';

@Component({
  selector: 'ta-order-type-creator',
  templateUrl: './order-type-creator.container.html',
  styleUrls: ['./order-type-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypeCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  private _returnUrl: string;

  private _orderType: IOrderType;

  orderType$: Observable<IOrderType>;

  orderTypeAssets$: Observable<Array<IAsset>>;

  images$: Observable<IOrderTypeImages>;

  isEditMode = false;

  private _orderTypeId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._orderTypeId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._orderTypeId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(OrderTypeSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(CurrenciesSelectors.selectIsCreateProcess),
      ),
    ).pipe(
      map(([isOrderTypeGetProcess, isCurrenciesGetProcess]) => isOrderTypeGetProcess || isCurrenciesGetProcess),
    );

    this.isProcessAssets$ = combineLatest(
      this._store.pipe(
        select(OrderTypeAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(OrderTypeAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(OrderTypeAssetsSelectors.selectIsDeleteProcess),
      ),
    ).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) => isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(OrderTypeSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(OrderTypeSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.orderTypeAssets$ = this._store.pipe(
      select(OrderTypeAssetsSelectors.selectCollection),
    );

    this.orderType$ = this._store.pipe(
      select(OrderTypeSelectors.selectEntity),
    );

    this.images$ = this._store.pipe(
      select(OrderTypeSelectors.selectImages),
    );

    this.orderType$.pipe(
      takeUntil(this.unsubscribe$),
      filter(orderType => !!orderType),
      filter(orderType => this._orderTypeId !== orderType.id),
    ).subscribe(orderType => {
      this._orderTypeId = orderType.id;
      this.isEditMode = !!this._orderTypeId;
    });

    if (!!this._orderTypeId) {
      this._store.dispatch(OrderTypeActions.getRequest({ id: this._orderTypeId }));
      this._store.dispatch(OrderTypeAssetsActions.getAllRequest({ orderTypeId: this._orderTypeId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(OrderTypeActions.clear());
    this._store.dispatch(OrderTypeAssetsActions.clear());
  }

  onMainOptionsSave(orderType: IOrderType): void {
    if (this.isEditMode) {
      this._store.dispatch(OrderTypeActions.updateRequest({ id: orderType.id, orderType }));
    } else {
      this._store.dispatch(OrderTypeActions.createRequest({ orderType }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }

  onMainImageUpload(file: File): void {
    this._store.dispatch(OrderTypeAssetsActions.uploadImageRequest({ orderTypeId: this._orderTypeId, imageType: OrderTypeImageTypes.MAIN, file }));
  }

  onIconImageUpload(file: File): void {
    this._store.dispatch(OrderTypeAssetsActions.uploadImageRequest({ orderTypeId: this._orderTypeId, imageType: OrderTypeImageTypes.ICON, file }));
  }
}
