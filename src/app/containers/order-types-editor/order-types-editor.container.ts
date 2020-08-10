import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { OrderTypesSelectors } from '@store/selectors/order-types.selectors';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { IOrderType, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-order-types-editor',
  templateUrl: './order-types-editor.container.html',
  styleUrls: ['./order-types-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypesEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IOrderType>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(OrderTypesActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(OrderTypesSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(OrderTypesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(OrderTypesSelectors.selectRefInfo),
    );
  }

  onCreate(): void {

    this._store.dispatch(OrderTypeActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(orderType: IOrderType): void {

    this._store.dispatch(OrderTypeActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: orderType.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(orderType: IOrderType): void {
    this._store.dispatch(OrderTypesActions.updateRequest({id: orderType.id, orderType}));
  }

  onDelete(id: string): void {
    this._store.dispatch(OrderTypesActions.deleteRequest({ id }));
  }
}
