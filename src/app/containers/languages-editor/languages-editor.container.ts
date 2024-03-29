import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguagesActions } from '@store/actions/languages.action';
import { LanguagesSelectors } from '@store/selectors/languages.selectors';
import { LanguageActions } from '@store/actions/language.action';
import { ILanguage, IRef, IAsset } from '@djonnyx/tornado-types';
import { AssetsSelectors } from '@store/selectors';
import { map } from 'rxjs/operators';
import { AssetsActions } from '@store/actions/assets.action';

@Component({
  selector: 'ta-languages-editor',
  templateUrl: './languages-editor.container.html',
  styleUrls: ['./languages-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesEditorContainer implements OnInit, OnDestroy {

  public isProcess$: Observable<boolean>;

  public isGetCollectionProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILanguage>>;

  public assets$: Observable<Array<IAsset>>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(LanguagesActions.getAllRequest({}));

    this._store.dispatch(AssetsActions.getAllRequest());

    this.isProcess$ = combineLatest([
      this._store.pipe(
        select(LanguagesSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
    ]).pipe(
      map(([isProductsProgress, isAssetsProgress]) =>
      isProductsProgress || isAssetsProgress),
    );
    
    this.isGetCollectionProcess$ = combineLatest([
      this._store.pipe(
        select(LanguagesSelectors.selectIsGetProcess),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectIsGetProcess),
      ),
    ]).pipe(
      map(([isProductsGetProgress, isAssetsGetProgress]) =>
      isProductsGetProgress || isAssetsGetProgress),
    );

    this.collection$ = this._store.pipe(
      select(LanguagesSelectors.selectCollection),
    );

    this.assets$ = this._store.pipe(
      select(AssetsSelectors.selectCollection),
    );

    this.refInfo$ = this._store.pipe(
      select(LanguagesSelectors.selectRefInfo),
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(LanguagesActions.clear());
    this._store.dispatch(AssetsActions.clear());
  }

  onCreate(): void {

    this._store.dispatch(LanguageActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
    });
  }

  onEdit(language: ILanguage): void {

    this._store.dispatch(LanguageActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: language.id, },
    });
  }

  onUpdate(language: ILanguage): void {
    this._store.dispatch(LanguagesActions.updateRequest({ id: language.id, language }));
  }

  onUpdateAll(language: ILanguage): void {
    this._store.dispatch(LanguagesActions.updateRequest({ id: language.id, language, setDafault: true }));
  }

  onDelete(id: string): void {
    this._store.dispatch(LanguagesActions.deleteRequest({ id }));
  }
}
