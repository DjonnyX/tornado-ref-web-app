import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { CurrenciesSelectors } from '@store/selectors/currencies.selectors';
import { CurrencyActions } from '@store/actions/currency.action';
import { ICurrency, IRef } from '@djonnyx/tornado-types';

@Component({
  selector: 'ta-currencies-editor',
  templateUrl: './currencies-editor.container.html',
  styleUrls: ['./currencies-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ICurrency>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(CurrenciesActions.getAllRequest());

    this.isProcess$ = this._store.pipe(
      select(CurrenciesSelectors.selectLoading),
    );

    this.collection$ = this._store.pipe(
      select(CurrenciesSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(CurrenciesSelectors.selectRefInfo),
    );
  }

  onCreate(): void {
    this._store.dispatch(CurrencyActions.clear());
    
    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(currency: ICurrency): void {
    this._store.dispatch(CurrencyActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: currency.id, },
    });
  }

  onUpdate(currency: ICurrency): void {
    this._store.dispatch(CurrenciesActions.updateRequest({id: currency.id, currency}));
  }

  onUpdateAll(currency: ICurrency): void {
    this._store.dispatch(CurrenciesActions.updateRequest({id: currency.id, currency, setDafault: true}));
  }

  onDelete(id: string): void {
    this._store.dispatch(CurrenciesActions.deleteRequest({ id }));
  }
}
