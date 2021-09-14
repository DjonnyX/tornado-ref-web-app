import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrenciesActions } from '@store/actions/currencies.action';
import { CurrenciesSelectors } from '@store/selectors/currencies.selectors';
import { CurrencyActions } from '@store/actions/currency.action';
import { ICurrency, IRef, UserRights } from '@djonnyx/tornado-types';
import { UserSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ta-currencies-editor',
  templateUrl: './currencies-editor.container.html',
  styleUrls: ['./currencies-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ICurrency>>;

  public refInfo$: Observable<IRef>;

  public rights$: Observable<Array<UserRights>>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(CurrenciesActions.getAllRequest({}));

    this.rights$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(p => p?.account?.role?.rights || []),
    );

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

  ngOnDestroy(): void {
    this._store.dispatch(CurrenciesActions.clear());
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
