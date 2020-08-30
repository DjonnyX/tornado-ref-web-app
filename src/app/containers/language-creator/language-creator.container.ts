import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LanguageActions } from '@store/actions/language.action';
import { LanguageSelectors } from '@store/selectors/language.selectors';
import { ILanguage, ILanguageImages, IAsset, LanguageImageTypes, ITranslation } from '@djonnyx/tornado-types';
import { LanguageAssetsSelectors, TranslationSelectors } from '@store/selectors';
import { LanguageAssetsActions } from '@store/actions/language-assets.action';
import { TranslationActions } from '@store/actions/translation.action';
import { ITranslate } from '@djonnyx/tornado-types/dist/interfaces/raw/ITranslation';

@Component({
  selector: 'ta-language-creator',
  templateUrl: './language-creator.container.html',
  styleUrls: ['./language-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessTranslations$: Observable<boolean>;

  private _returnUrl: string;

  private _language: ILanguage;

  language$: Observable<ILanguage>;

  private _languageId$ = new BehaviorSubject<string>(undefined);
  readonly languageId$ = this._languageId$.asObservable();

  languageAssets$: Observable<Array<IAsset>>;

  translation$: Observable<ITranslation>;

  images$: Observable<ILanguageImages>;

  isPrepareToConfigure$: Observable<boolean>;

  isEditMode = false;

  private _languageId: string;

  private _translation: ITranslation;

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
    ).pipe(
      map(([isLanguageGetProcess]) => isLanguageGetProcess),
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

    this.languageAssets$ = this._store.pipe(
      select(LanguageAssetsSelectors.selectCollection),
    );

    this.language$ = this._store.pipe(
      select(LanguageSelectors.selectEntity),
    );

    this.images$ = this._store.pipe(
      select(LanguageSelectors.selectImages),
    );

    this.translation$ = this._store.pipe(
      select(TranslationSelectors.selectEntity),
    );

    this.language$.pipe(
      takeUntil(this.unsubscribe$),
      filter(language => !!language),
    ).subscribe(language => {
      this._language = language;
      this._languageId = language.id;
      this._languageId$.next(this._languageId);
      this.isEditMode = true;

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
      this._store.dispatch(LanguageAssetsActions.getAllRequest({ languageId: this._languageId }));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._store.dispatch(LanguageActions.clear());
    this._store.dispatch(LanguageAssetsActions.clear());
    this._store.dispatch(TranslationActions.clear());
  }

  onMainOptionsSave(language: ILanguage): void {
    if (this.isEditMode) {
      this._store.dispatch(LanguageActions.updateRequest({ id: language.id, language }));
    } else {
      this._store.dispatch(LanguageActions.createRequest({ language }));
    }
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

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }

  onAssetUpload(file: File): void {
    this._store.dispatch(LanguageAssetsActions.uploadImageRequest({ languageId: this._languageId, imageType: LanguageImageTypes.MAIN, file }));
  }
}
