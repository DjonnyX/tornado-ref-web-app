import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { LanguagesSelectors, LanguageAssetsSelectors, AssetsSelectors, TranslationSelectors } from '@store/selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IAsset, IFileUploadEvent } from '@models';
import { LanguageAssetsActions } from '@store/actions/language-assets.action';
import { LanguageSelectors } from '@store/selectors/language.selectors';
import { LanguageActions } from '@store/actions/language.action';
import { ILanguage, LanguageImageTypes, ILanguageContents, ITranslation } from '@djonnyx/tornado-types';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';
import { deepMergeObjects } from '@app/utils/object.util';
import { IAssetUploadEvent } from '@app/models/file-upload-event.model';
import { normalizeEntityContents } from '@app/utils/entity.util';
import { TranslationActions } from '@store/actions/translation.action';
import { ITranslate } from '@djonnyx/tornado-types/dist/interfaces/raw/ITranslation';

@Component({
  selector: 'ta-language-creator',
  templateUrl: './language-creator.container.html',
  styleUrls: ['./language-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessTranslations$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  rootNodeId$: Observable<string>;

  language$: Observable<ILanguage>;

  languages$: Observable<Array<ILanguage>>;

  languageAssets$: Observable<Array<IAsset>>;

  translation$: Observable<ITranslation>;

  assets$: Observable<Array<IAsset>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _returnUrl: string;

  private _languageId: string;

  private _languageId$ = new BehaviorSubject<string>(undefined);
  readonly languageId$ = this._languageId$.asObservable();

  private _language: ILanguage;

  private _translation: ITranslation;

  private _defaultLanguage: ILanguage;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._languageId = this._activatedRoute.snapshot.queryParams["id"];
    this._languageId$.next(this._languageId);

    this.isEditMode = !!this._languageId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(LanguageSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
    ).pipe(
      map(([isGetLanguageProcess, isLanguagesProcess, isAssetsProcess]) =>
        isGetLanguageProcess || isLanguagesProcess || isAssetsProcess),
    );

    this.isProcessTranslations$ = combineLatest(
      this._store.pipe(
        select(TranslationSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(TranslationSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isGetProcess, isUpdateProcess]) => isGetProcess || isUpdateProcess),
    );

    this.isProcessMainOptions$ = combineLatest(
      this._store.pipe(
        select(LanguageSelectors.selectIsCreateProcess),
      ),
      this._store.pipe(
        select(LanguageSelectors.selectIsUpdateProcess),
      ),
    ).pipe(
      map(([isCreateProcess, isUpdateProcess]) => isCreateProcess || isUpdateProcess),
    );

    this.isProcessAssets$ = combineLatest(
      this._store.pipe(
        select(LanguageAssetsSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(LanguageAssetsSelectors.selectIsUpdateProcess),
      ),
      this._store.pipe(
        select(LanguageAssetsSelectors.selectIsDeleteProcess),
      ),
    ).pipe(
      map(([isGetProcess, isUpdateProcess, isDeleteProcess]) => isGetProcess || isUpdateProcess || isDeleteProcess),
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

    this.languageAssets$ = combineLatest(
      this._store.select(LanguageAssetsSelectors.selectCollection),
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
    
    this.translation$ = this._store.pipe(
      select(TranslationSelectors.selectEntity),
    );

    this.language$ = combineLatest(
      this._store.select(LanguageSelectors.selectEntity),
      this.languages$,
      this.defaultLanguage$,
    ).pipe(
      filter(([language, langs, defaultLang]) => !!language && !!defaultLang && !!langs),
      map(([language, langs, defaultLang]) => {
        const contents: ILanguageContents = {};

        // мерджинг контента от дефолтового языка
        for (const lang in language.contents) {
          // переопределение контента для разных языков
          contents[lang] = lang === defaultLang.code ? language.contents[lang] : deepMergeObjects(language.contents[defaultLang.code], language.contents[lang]);
        }

        // добовление контента языков которых нет в базе
        for (const lang of langs) {
          if (contents[lang.code]) {
            continue;
          }

          contents[lang.code] = language.contents[defaultLang.code];
        }

        return { ...language, contents: normalizeEntityContents(contents, defaultLang.code) };
      })
    );

    this.language$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(language => {
      this._language = language;
      this._languageId = language.id;
      this._languageId$.next(this._languageId);
      this.isEditMode = true;

      this._store.dispatch(LanguageAssetsActions.getAllRequest({ languageId: this._languageId }));
      this._store.dispatch(TranslationActions.getRequest({ id: language.translation }));

      // для изменения параметров маршрута
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {
          id: this._languageId,
          returnUrl: this._returnUrl,
        }
      });
    });

    this.translation$.pipe(
      takeUntil(this.unsubscribe$),
      filter(translation => !!translation),
    ).subscribe(translation => {
      this._translation = translation;
    });

    if (!!this._languageId) {
      this._store.dispatch(LanguageActions.getRequest({ id: this._languageId }));
    }

    this._store.dispatch(LanguagesActions.getAllRequest());
    this._store.dispatch(AssetsActions.getAllRequest());

    const prepareMainRequests$ = combineLatest(
      this.languages$,
      this.assets$,
    ).pipe(
      map(([languages, assets]) =>
        !!languages && !!assets),
    );

    this.isPrepareToConfigure$ = this.languageId$.pipe(
      switchMap(id => {
        return !!id ? combineLatest(
          prepareMainRequests$,
          this.language$,
          this.languageAssets$,
        ).pipe(
          map(([prepareMainRequests, language, languageAssets]) =>
            !!prepareMainRequests && !!language && !!languageAssets),
        ) : prepareMainRequests$;
      })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LanguageActions.clear());
    this._store.dispatch(LanguageAssetsActions.clear());
    this._store.dispatch(TranslationActions.clear());
  }

  onMainImageUpload(data: IFileUploadEvent): void {
    this._store.dispatch(LanguageAssetsActions.uploadImageRequest({ languageId: this._languageId, imageType: LanguageImageTypes.MAIN, data }));
  }

  onMainOptionsSave(language: ILanguage): void {
    if (this.isEditMode) {
      const normalizedLanguage: ILanguage = {...language};

      // нормализация контена
      normalizeEntityContents(normalizedLanguage.contents, this._defaultLanguage.code);

      this._store.dispatch(LanguageActions.updateRequest({ id: language.id, language: normalizedLanguage }));
    } else {
      this._store.dispatch(LanguageActions.createRequest({ language }));
    }

    // this._router.navigate([this._returnUrl]);
  }

  onMainOptionsCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onTranslationUpdate(translate: ITranslate): void {
    this._store.dispatch(TranslationActions.updateRequest({
      id: this._translation.id,
      translation: {
        ...this._translation,
        items: this._translation.items.map(item => ((item.key === translate.key) ? translate : item)),
      },
    }));
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }
}
