import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { AdsSelectors, AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { AdsActions } from '@store/actions/ads.action';
import { Router, ActivatedRoute } from '@angular/router';
import { AdActions } from '@store/actions/ad.action';
import { IAd, IRef, AdTypes, IAsset, ILanguage } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { map, filter } from 'rxjs/operators';
import { LanguagesActions } from '@store/actions/languages.action';

@Component({
  selector: 'ta-ads-editor',
  templateUrl: './ads-editor.container.html',
  styleUrls: ['./ads-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdsEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public isPrepareToShow$: Observable<boolean>;

  public collection$: Observable<Array<IAd>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  public refInfo$: Observable<IRef>;

  private _adsType: AdTypes;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._adsType = this._activatedRoute.snapshot.data.type;

    this._store.dispatch(AdsActions.getAllRequest({ adType: this._adsType }));

    this._store.dispatch(AssetsActions.getAllRequest());
    
    this._store.dispatch(LanguagesActions.getAllRequest());

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(AdsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isProductsProgress, isAssetsProgress, isLanguagesProcess]) => isProductsProgress || isAssetsProgress || isLanguagesProcess),
    );

    this.collection$ = this._store.pipe(
      select(AdsSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(AdsSelectors.selectRefInfo),
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

    this._store.dispatch(AdActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url, type: this._adsType },
    });
  }

  onEdit(ad: IAd): void {

    this._store.dispatch(AdActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: ad.id, returnUrl: this._router.routerState.snapshot.url, type: this._adsType },
    });
  }

  onUpdate(ad: IAd): void {
    this._store.dispatch(AdsActions.updateRequest({ id: ad.id, ad }));
  }

  onDelete(id: string): void {
    this._store.dispatch(AdsActions.deleteRequest({ id }));
  }
}