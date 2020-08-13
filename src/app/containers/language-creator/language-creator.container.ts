import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { LanguageActions } from '@store/actions/language.action';
import { LanguageSelectors } from '@store/selectors/language.selectors';
import { ILanguage, ILanguageImages, IAsset } from '@djonnyx/tornado-types';
import { CurrenciesSelectors, LanguageAssetsSelectors } from '@store/selectors';
import { LanguageAssetsActions } from '@store/actions/language-assets.action';

@Component({
  selector: 'ta-language-creator',
  templateUrl: './language-creator.container.html',
  styleUrls: ['./language-creator.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCreatorContainer extends BaseComponent implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  isProcessMainOptions$: Observable<boolean>;

  isProcessAssets$: Observable<boolean>;

  private _returnUrl: string;

  private _language: ILanguage;

  language$: Observable<ILanguage>;

  languageAssets$: Observable<Array<IAsset>>;

  images$: Observable<ILanguageImages>;

  isEditMode = false;

  private _languageId: string;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

    this._languageId = this._activatedRoute.snapshot.queryParams["id"];

    this.isEditMode = !!this._languageId;

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(LanguageSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(CurrenciesSelectors.selectIsCreateProcess),
      ),
    ).pipe(
      map(([isLanguageGetProcess, isCurrenciesGetProcess]) => isLanguageGetProcess || isCurrenciesGetProcess),
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

    this.language$.pipe(
      takeUntil(this.unsubscribe$),
      filter(language => !!language),
      filter(language => this._languageId !== language.id),
    ).subscribe(language => {
      this._languageId = language.id;
      this.isEditMode = !!this._languageId;
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
  }

  onMainOptionsSave(language: ILanguage): void {
    if (this.isEditMode) {
      this._store.dispatch(LanguageActions.updateRequest({ id: language.id, language }));
    } else {
      this._store.dispatch(LanguageActions.createRequest({ language }));
    }
  }

  onCancel(): void {
    this._router.navigate([this._returnUrl]);
  }

  onToBack(): void {
    this._router.navigate([this._returnUrl]);
  }

  onAssetUpload(file: File): void {
    this._store.dispatch(LanguageAssetsActions.createRequest({ languageId: this._languageId, file }));
  }

  onAssetUpdate(asset: IAsset): void {
    this._store.dispatch(LanguageAssetsActions.updateRequest({ languageId: this._languageId, asset }));
  }

  onAssetDelete(asset: IAsset): void {
    this._store.dispatch(LanguageAssetsActions.deleteRequest({ languageId: this._languageId, assetId: asset.id }));
  }
}
