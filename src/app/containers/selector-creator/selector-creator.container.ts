import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of } from 'rxjs';
import { SelectorsSelectors, SelectorAssetsSelectors, BusinessPeriodsSelectors, AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { SelectorsActions } from '@store/actions/selectors.action';
import { SelectorAssetsActions } from '@store/actions/selector-assets.action';
import { SelectorSelectors } from '@store/selectors/selector.selectors';
import { SelectorActions } from '@store/actions/selector.action';
import { ISelector, SelectorImageTypes, ILanguage, ISelectorContents, SelectorTypes } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { deepMergeObjects } from '@app/utils/object.util';
import { IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { normalizeEntityContents } from '@app/utils/entity.util';

@Component({
  selector: 'ta-selector-creator',
  templateUrl: './selector-creator.container.html',
  styleUrls: ['./selector-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  selector$: Observable<ISelector>;

  selectors$: Observable<Array<ISelector>>;

  selectorAssets$: Observable<Array<IAsset>>;

  gallerySelectorAssets$: Observable<{ [lang: string]: Array<IAsset> }>;

  assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _returnUrl: string;

  private _selectorId: string;

  private _selectorType: string;

  private _selector: ISelector;

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._selectorId = this._activatedRoute.snapshot.queryParams["id"];

    this._selectorType = this._activatedRoute.snapshot.queryParams["type"];

    this.isEditMode = !!this._selectorId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(SelectorSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isGetSelectorProcess, isSelectorsProcess, isAssetsProcess, isLanguagesProcess]) =>
        isGetSelectorProcess || isSelectorsProcess || isAssetsProcess || isLanguagesProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(SelectorSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(SelectorSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.isProcessAssets$ = combineLatest(
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(SelectorAssetsSelectors.selectIsDeleteProcess),
      ),
    ).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) => isGetProcess || isUpdateProcess || isDeleteProcess),
    );

    this.selectors$ = this._store.pipe(
      select(SelectorsSelectors.selectCollection),
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

    this.selectorAssets$ = combineLatest(
      this._store.select(SelectorAssetsSelectors.selectCollection),
      this.languages$,
    ).pipe(
      filter(([assets, langs]) => !!assets && !!langs),
      switchMap(([assets, langs]) => {
        const result = new Array<IAsset>();

        for (const lang in assets) {
          result.push(...assets[lang]);
        }

        return of(result);
      }),
    );

    this.selector$ = combineLatest(
      this._store.select(SelectorSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ).pipe(
      filter(([selector, langs, defaultLang]) => !!selector && !!defaultLang && !!langs),
      map(([selector, langs, defaultLang]) => {
        const contents: ISelectorContents = {};

        // мерджинг контента от дефолтового языка
        for (const lang in selector.contents) {
          // переопределение контента для разных языков
          contents[lang] = lang === defaultLang.code ? selector.contents[lang] : deepMergeObjects(selector.contents[defaultLang.code], selector.contents[lang]);
        }

        // добовление контента языков которых нет в базе
        for (const lang of langs) {
          if (contents[lang.code]) {
            continue;
          }

          contents[lang.code] = selector.contents[defaultLang.code];
        }

        return { ...selector, contents: normalizeEntityContents(contents, defaultLang.code) };
      })
    );

    this.selector$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(selector => {
      this._selector = selector;
      this._selectorId = selector.id;
      this.isEditMode = true;
    });

    this.gallerySelectorAssets$ = combineLatest(
      this.selector$,
      this._store.select(SelectorAssetsSelectors.selectCollection),
      this.languages$,
      this.defaultLanguage$,
    ).pipe(
      filter(([selector, assets, langs, defaultLang]) => !!selector && !!assets && !!langs && !!defaultLang),
      map(([selector, assets, langs, defaultLang]) => {
        const result: { [lang: string]: Array<IAsset> } = {};
        for (const lang in assets) {
          result[lang] = assets[lang].filter(asset =>
            !selector.contents[lang] ||
            (
              !selector.contents[lang].images || (asset.id !==
                selector.contents[lang].images.main && asset.id !==
                selector.contents[lang].images.thumbnail && asset.id !==
                selector.contents[lang].images.icon)
            ))
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

    if (!!this._selectorId) {
      this._store.dispatch(SelectorActions.getRequest({ id: this._selectorId }));
      this._store.dispatch(SelectorAssetsActions.getAllRequest({ selectorId: this._selectorId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest());
    this._store.dispatch(SelectorsActions.getAllRequest({}));
    this._store.dispatch(AssetsActions.getAllRequest());
    // this._store.dispatch(TagsActions.getAllRequest());

    const prepareMainRequests$ = combineLatest(
      this.selectors$,
      this.languages$,
      this.defaultLanguage$,
      this.assets$,
    ).pipe(
      map(([selectors, languages, defaultLanguage, assets]) =>
        !!selectors && !!languages && !!defaultLanguage && !!assets),
    );

    this.isPrepareToConfigure$ = of(this._selectorId).pipe(
      switchMap(id => {
        return !!id ? combineLatest(
          prepareMainRequests$,
          this.selector$,
          this.selectorAssets$,
        ).pipe(
          map(([prepareMainRequests, selector, selectorAssets]) =>
            !!prepareMainRequests && !!selector && !!selectorAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(SelectorActions.clear());
    this._store.dispatch(SelectorAssetsActions.clear());
  }

  onAssetUpload(data: IFileUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.createRequest({ selectorId: this._selectorId, data }));
  }

  onAssetUpdate(data: IAssetUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.updateRequest({ selectorId: this._selectorId, langCode: data.langCode, asset: data.asset }));
  }

  onAssetDelete(data: IAssetUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.deleteRequest({ selectorId: this._selectorId, langCode: data.langCode, assetId: data.asset.id }));
  }

  onMainImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.uploadImageRequest({ selectorId: this._selectorId, imageType: SelectorImageTypes.MAIN, data }));
  }

  onThumbnailImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.uploadImageRequest({ selectorId: this._selectorId, imageType: SelectorImageTypes.THUMBNAIL, data }));
  }

  onIconImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(SelectorAssetsActions.uploadImageRequest({ selectorId: this._selectorId, imageType: SelectorImageTypes.ICON, data }));
  }

  onMainOptionsSave(selector: ISelector): void {
    if (this.isEditMode) {
      const normalizedSelector: ISelector = { ...selector };

      // нормализация контена
      normalizeEntityContents(normalizedSelector.contents, this._defaultLanguage.code);

      this._store.dispatch(SelectorActions.updateRequest({ id: selector.id, selector: normalizedSelector }));
    } else {
      this._store.dispatch(SelectorActions.createRequest({ selector: { ...selector, type: this._selectorType as any } }));
    }

    // this._router.navigate([this._returnUrl]);
  }

  onMainOptionsCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
