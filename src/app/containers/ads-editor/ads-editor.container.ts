import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { AdsSelectors, AssetsSelectors, LanguagesSelectors, SettingsSelectors, UserSelectors } from '@store/selectors';
import { AdsActions } from '@store/actions/ads.action';
import { Router, ActivatedRoute } from '@angular/router';
import { AdActions } from '@store/actions/ad.action';
import { IAd, IRef, AdTypes, IAsset, ILanguage, UserRights } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { map, filter } from 'rxjs/operators';
import { LanguagesActions } from '@store/actions/languages.action';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { SettingsActions } from '@store/actions/settings.action';

@Component({
  selector: 'ta-ads-editor',
  templateUrl: './ads-editor.container.html',
  styleUrls: ['./ads-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdsEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isPrepareToShow$: Observable<boolean>;

  public collection$: Observable<Array<IAd>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  rights$: Observable<Array<UserRights>>;

  public refInfo$: Observable<IRef>;

  private _adsType: AdTypes;

  layoutType$: Observable<LayoutTypes>;

  displayInactiveEntities$: Observable<boolean>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.rights$ = this._store.pipe(
      select(UserSelectors.selectUserProfile),
      map(p => p?.account?.role?.rights || []),
    );
    
    this._adsType = this._activatedRoute.snapshot.data.type;

    this.layoutType$ = this._store.pipe(
      select(SettingsSelectors.selectAdsLayout),
    );

    this.displayInactiveEntities$ = this._store.pipe(
      select(SettingsSelectors.selectAdsInactiveVisibility),
    );

    this._store.dispatch(AdsActions.getAllRequest({
      options: {
        filter: [{
          id: 'type', operation: 'equals', value: this._adsType,
        }],
      }
    }));
    this._store.dispatch(AssetsActions.getAllRequest());
    this._store.dispatch(LanguagesActions.getAllRequest({}));

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(AdsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isProductsProgress, isAssetsProgress, isLanguagesProcess]) =>
        isProductsProgress || isAssetsProgress || isLanguagesProcess),
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

    this.isPrepareToShow$ = combineLatest([
      this.collection$,
      this.assets$,
      this.languages$,
    ]).pipe(
      map(([collection, assets, languages]) => !!collection && !!assets && !!languages),
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(AdsActions.clear());
    this._store.dispatch(LanguagesActions.clear());
    this._store.dispatch(AssetsActions.clear());
  }

  onCreate(): void {
    this._store.dispatch(AdActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { type: this._adsType },
    });
  }

  onEdit(ad: IAd): void {
    this._store.dispatch(AdActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: ad.id, type: this._adsType },
    });
  }

  onUpdate(ad: IAd): void {
    this._store.dispatch(AdsActions.updateRequest({ id: ad.id, ad }));
  }

  onDelete(id: string): void {
    this._store.dispatch(AdsActions.deleteRequest({ id }));
  }

  onChangeLayout(layout: LayoutTypes): void {
    this._store.dispatch(SettingsActions.changeAdsLayout({ layout }));
  }

  onChangeDisplayInactiveEntities(showInactive: boolean): void {
    this._store.dispatch(SettingsActions.changeAdsVisibility({ showInactive }));
  }
}
