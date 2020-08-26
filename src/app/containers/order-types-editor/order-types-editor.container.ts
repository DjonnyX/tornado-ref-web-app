import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderTypesActions } from '@store/actions/order-types.action';
import { OrderTypesSelectors } from '@store/selectors/order-types.selectors';
import { OrderTypeActions } from '@store/actions/order-type.action';
import { IOrderType, IRef, IAsset, ILanguage } from '@djonnyx/tornado-types';
import { AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { map, filter } from 'rxjs/operators';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';

@Component({
  selector: 'ta-order-types-editor',
  templateUrl: './order-types-editor.container.html',
  styleUrls: ['./order-types-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTypesEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<IOrderType>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToShow$ : Observable<boolean>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(OrderTypesActions.getAllRequest());

    this._store.dispatch(AssetsActions.getAllRequest());

    this._store.dispatch(LanguagesActions.getAllRequest());

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(OrderTypesSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isProductsProgress, isAssetsProgress, isLanguageProgress]) => isProductsProgress || isAssetsProgress || isLanguageProgress),
    );

    this.collection$ = this._store.pipe(
      select(OrderTypesSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(OrderTypesSelectors.selectRefInfo),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.isPrepareToShow$ = combineLatest(
      this.collection$,
      this.assets$,
      this.languages$,
    ).pipe(
        map(([collection, assets, languages]) => !!collection && !!assets && !!languages),
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
    this._store.dispatch(OrderTypesActions.updateRequest({ id: orderType.id, orderType }));
  }

  onDelete(id: string): void {
    this._store.dispatch(OrderTypesActions.deleteRequest({ id }));
  }
}
