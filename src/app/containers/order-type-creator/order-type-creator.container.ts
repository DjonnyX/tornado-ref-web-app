import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { OrderTypeSelectors } from '@store/selectors/order-type.selectors';
import { IOrderType } from '@djonnyx/tornado-types';
import { CurrenciesSelectors } from '@store/selectors';

@Component({
  selector: 'ta-order-type-creator',
  templateUrl: './order-type-creator.container.html',
  styleUrls: ['./order-type-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypeCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _orderType: IOrderType;

  orderType$: Observable<IOrderType>;

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

    this.orderType$ = this._store.pipe(
      select(OrderTypeSelectors.selectEntity),
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
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(OrderTypeActions.clear());
  }

  onSubmit(orderType: IOrderType): void {
    if (this.isEditMode) {
      this._store.dispatch(OrderTypeActions.updateRequest({ id: orderType.id, orderType }));
    } else {
      this._store.dispatch(OrderTypeActions.createRequest({ orderType }));
    }

    this._router.navigate([this._returnUrl]);
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
