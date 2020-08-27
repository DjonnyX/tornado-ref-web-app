import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageActions } from '@store/actions/language.action';
import { ILanguage, IRef, IAsset } from '@djonnyx/tornado-types';
import { AssetsSelectors, LanguagesSelectors } from '@store/selectors';
import { map, filter } from 'rxjs/operators';
import { AssetsActions } from '@store/actions/assets.action';
import { LanguagesActions } from '@store/actions/languages.action';

@Component({
  selector: 'ta-languages-editor',
  templateUrl: './languages-editor.container.html',
  styleUrls: ['./languages-editor.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesEditorContainer implements OnInit {

  public isProcess$: Observable<boolean>;

  public collection$: Observable<Array<ILanguage>>;

  public assets$: Observable<Array<IAsset>>;

  languages$: Observable<Array<ILanguage>>;

  defaultLanguage$: Observable<ILanguage>;

  isPrepareToShow$ : Observable<boolean>;

  public refInfo$: Observable<IRef>;

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._store.dispatch(LanguagesActions.getAllRequest());

    this._store.dispatch(AssetsActions.getAllRequest());

    this.isProcess$ = combineLatest(
      this._store.pipe(
        select(LanguagesSelectors.selectLoading),
      ),
      this._store.pipe(
        select(AssetsSelectors.selectLoading),
      ),
    ).pipe(
      map(([isProductsProgress, isAssetsProgress]) => isProductsProgress || isAssetsProgress),
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

    this._store.dispatch(LanguageActions.clear());

    this._router.navigate(["create"], {
      relativeTo: this._activatedRoute,
      queryParams: { returnUrl: this._router.routerState.snapshot.url },
    });
  }

  onEdit(language: ILanguage): void {

    this._store.dispatch(LanguageActions.clear());

    this._router.navigate(["edit"], {
      relativeTo: this._activatedRoute,
      queryParams: { id: language.id, returnUrl: this._router.routerState.snapshot.url, },
    });
  }

  onUpdate(language: ILanguage): void {
    this._store.dispatch(LanguagesActions.updateRequest({ id: language.id, language }));
  }

  onDelete(id: string): void {
    this._store.dispatch(LanguagesActions.deleteRequest({ id }));
  }
}
