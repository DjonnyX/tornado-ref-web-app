import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from './node_modules/@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from './node_modules/@components/base/base-component';
import { CurrencyActions } from './node_modules/@store/actions/currency.action';
import { CurrencySelectors } from './node_modules/@store/selectors/currency.selectors';
import { ICurrency } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-currency-creator',
  templateUrl: './currency-creator.container.html',
  styleUrls: ['./currency-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  private _returnUrl: string;

  private _currency: ICurrency;

  currency$: Observable<ICurrency>;

  isEditMode = false;

  private _currencyId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._currencyId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._currencyId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(CurrencySelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(CurrencySelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCurrencyGetProcess, selectIsUpdateProcess]) => isCurrencyGetProcess || selectIsUpdateProcess),
    );

    this.currency$ = this._store.pipe(
      select(CurrencySelectors.selectEntity),
    );

    this.currency$.pipe(
      takeUntil(this.unsubscribe$),
      filter(currency => !!currency),
      filter(currency => this._currencyId !== currency.id),
    ).subscribe(currency => {
      this._currencyId = currency.id;
      this.isEditMode = !!this._currencyId;
    });

    if (!!this._currencyId) {
      this._store.dispatch(CurrencyActions.getRequest({ id: this._currencyId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(CurrencyActions.clear());
  }

  onSubmit(currency: ICurrency): void {
    if (this.isEditMode) {
      this._store.dispatch(CurrencyActions.updateRequest({ id: currency.id, currency }));
    } else {
      this._store.dispatch(CurrencyActions.createRequest({ currency }));
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
