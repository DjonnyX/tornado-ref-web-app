import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { AdSelectors, AdAssetsSelectors, AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { AdsActions } from '@store/actions/ads.action';
import { AdAssetsActions } from '@store/actions/ad-assets.action';
import { AdActions } from '@store/actions/ad.action';
import { IAd, AdResourceTypes, ILanguage, IAdContents, AdTypes } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { deepMergeObjects } from '@app/utils/object.util';
import { IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { normalizeEntityContents, getCompiledContents } from '@app/utils/entity.util';

@Component({
  selector: 'ta-ad-creator',
  templateUrl: './ad-creator.container.html',
  styleUrls: ['./ad-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  ad$: Observable<IAd>;

  adAssets$: Observable<Array<IAsset>>;

  galleryAdAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _adId: string;

  private _adId$ = new BehaviorSubject<string>(undefined);
  readonly adId$ = this._adId$.asObservable();

  private _adType: AdTypes;

  private _ad: IAd;

  private _defaultLanguage: ILanguage;

  private _pagePath: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._adId = this._activatedRoute.snapshot.queryParams["id"];
    this._adId$.next(this._adId);

    this._adType = this._activatedRoute.snapshot.queryParams["type"];
    this._pagePath = this._activatedRoute.snapshot.data["path"];

    this.isEditMode = !!this._adId;

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(AdSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isGetAdProcess, isAssetsProcess, isLanguagesProcess]) =>
        isGetAdProcess || isAssetsProcess || isLanguagesProcess),
    );

    this.isProcessMainOptions$ = combineLatest([
      this._store.pipe(
        select(AdSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(AdSelectors.selectIsUpdateProcess),
      ),
    ]).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.isProcessAssets$ = combineLatest([
      this._store.pipe(
        select(AdAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AdAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(AdAssetsSelectors.selectIsDeleteProcess),
      ),
    ]).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) =>
        isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.languages$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.defaultLanguage$ = this.languages$.pipe(
      filter(languages => !!languages),
      map(languages => languages.find(v => !!v.isDefault)),
      filter(language => !!language),
    );

    this.defaultLanguage$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(lang => {
      this._defaultLanguage = lang;
    });

    this.adAssets$ = combineLatest([
      this._store.select(AdAssetsSelectors.selectCollection),
      this.languages$,
    ]).pipe(
      filter(([assets, langs]) => !!assets && !!langs),
      switchMap(([assets, langs]) => {
        const result = new Array<IAsset>();

        for (const lang in assets) {
          result.push(...assets[lang]);
        }

        return of(result);
      }),
    );

    this.ad$ = combineLatest([
      this._store.select(AdSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([ad, langs, defaultLang]) => !!ad && !!defaultLang && !!langs),
      map(([ad, langs, defaultLang]) => {
        return { ...ad, contents: getCompiledContents(ad.contents, langs, defaultLang) };
      })
    );

    this.ad$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(ad => {
      this._ad = ad;
      this._adId = ad.id;
      this._adId$.next(this._adId);
      this.isEditMode = true;

      this._store.dispatch(AdAssetsActions.getAllRequest({ adId: this._adId }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._adId,
        }
      });
    });

    this.galleryAdAssets$ = combineLatest([
      this.ad$,
      this._store.select(AdAssetsSelectors.selectCollection),
      this.languages$,
      this.defaultLanguage$,
    ]).pipe(
      filter(([ad, assets, langs, defaultLang]) => !!ad && !!assets && !!langs && !!defaultLang),
      map(([ad, assets, langs, defaultLang]) => {
        const result: { [lang: string]: Array<IAsset> } = {};
        for (const lang in assets) {
          result[lang] = assets[lang].filter(asset =>
            !ad.contents[lang] ||
            (
              !ad.contents[lang].resources || (asset.id !== ad.contents[lang].resources.main)
            )
          );
        }

        // добовление контента языков которых нет в базе
        for (const lang of langs) {
          if (result[lang.code]) {
            continue;
          }

          result[lang.code] = [];
        }
        return result;
      }),
    );

    if (!!this._adId) {
      this._store.dispatch(AdActions.getRequest({ id: this._adId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest());
    this._store.dispatch(AdsActions.getAllRequest({}));
    this._store.dispatch(AssetsActions.getAllRequest());
    // this._store.dispatch(TagsActions.getAllRequest());

    const prepareMainRequests$ = combineLatest([
      this.languages$,
      this.defaultLanguage$,
      this.assets$,
    ]).pipe(
      map(([languages, defaultLanguage, assets]) =>
        !!languages && !!defaultLanguage && !!assets),
    );

    this.isPrepareToConfigure$ = this.adId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest([
          prepareMainRequests$,
          this.ad$,
          this.adAssets$,
        ]).pipe(
          map(([prepareMainRequests, ad, adAssets]) =>
            !!prepareMainRequests && !!ad && !!adAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(AdActions.clear());
    this._store.dispatch(AdAssetsActions.clear());
  }

  onMainResourceUpload(data: IFileUploadEvent): void {
    this._store.dispatch(AdAssetsActions.uploadResourceRequest({ adId: this._adId, resourcesType: AdResourceTypes.MAIN, data }));
  }

  onMainOptionsSave(ad: IAd): void {
    if (this.isEditMode) {
      const normalizedAd: IAd = { ...ad };

      // нормализация контена
      normalizeEntityContents(normalizedAd.contents, this._defaultLanguage.code);

      this._store.dispatch(AdActions.updateRequest({ id: ad.id, ad: normalizedAd }));
    } else {
      this._store.dispatch(AdActions.createRequest({ ad: { ...ad, type: this._adType } }));
    }
  }

  onMainOptionsCancel(): void {
    this._router.navigate([`/admin/${this._pagePath}`]);
  }

  onToBack(): void {
    this._router.navigate([`/admin/${this._pagePath}`]);
  }
}
